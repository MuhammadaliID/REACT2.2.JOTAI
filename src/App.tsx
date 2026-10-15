
import { useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addUserAtom, deleteUser, editUserAtom, getDataAtom } from "./Store/Jotai";

function App() {
  let data = useAtomValue(getDataAtom);
  let [, deleteUsers] = useAtom(deleteUser);
  let [, addUser] = useAtom(addUserAtom);
  let [, editUser] = useAtom(editUserAtom);
  let [open, setOpen] = useState(false);
  let [editOpen, setEditOpen] = useState(false);
  let [selectedUser, setSelectedUser] = useState(null);

  let { register, handleSubmit, reset } = useForm();
  let { register: editRegister, handleSubmit: editHandleSubmit, reset: editReset } = useForm();

  async function onSubmit(value) {
    await addUser({ name: value.name, age: Number(value.age) });
    reset();
    setOpen(false);
  }

  function openEdit(user) {
    setSelectedUser(user);
    editReset({ name: user.name, age: user.age });
    setEditOpen(true);
  }

  async function onEdit(values) {
    await editUser({ id: selectedUser.id, name: values.name, age: Number(values.age) });
    setEditOpen(false);
    setSelectedUser(null);
    editReset();
  }

  return (
    <>
      <div>
        <button onClick={() => setOpen(true)}>ADD</button>
        {data.map((elem) => (
          <div key={elem.id}>
            <h1>{elem.name}</h1>
            <h2>{elem.age}</h2>
            <button onClick={() => deleteUsers(elem.id)}>Delete</button>
            <button onClick={() => openEdit(elem)}>Edit</button>
          </div>
        ))}
      </div>

      {open && (
        <dialog open style={{ padding: "20px" }}>
          <h3>Add User</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Name" {...register("name", { required: true })} />
            <br /><br />
            <input type="number" placeholder="Age" {...register("age", { required: true, min: 1 })} />
            <br /><br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => { setOpen(false); reset(); }}>Close</button>
          </form>
        </dialog>
      )}

      {editOpen && selectedUser && (
        <dialog open style={{ padding: "20px" }}>
          <h3>Edit User</h3>
          <form onSubmit={editHandleSubmit(onEdit)}>
            <input placeholder="Name" {...editRegister("name", { required: true })} />
            <br /><br />
            <input type="number" placeholder="Age" {...editRegister("age", { required: true, min: 1 })} />
            <br /><br />
            <button type="submit">Update</button>
            <button type="button" onClick={() => { setEditOpen(false); setSelectedUser(null); editReset(); }}>Close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default App;
