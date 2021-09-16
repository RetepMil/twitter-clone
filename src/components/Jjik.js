import { dbService } from "fbase";
import React, { useState } from "react";

const Jjik = ({ jjikObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJjik, setnewJjik] = useState(jjikObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this jjik?");
    if (ok) await dbService.doc(`jjiks/${jjikObj.id}`).delete();
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`jjiks/${jjikObj.id}`).update({
      text: newJjik,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewJjik(value);
  };

  return (
    <div key={jjikObj.id}>
      {editing ? (
        isOwner && (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your jjik"
                value={newJjik}
                onChange={onChange}
                required
              />
              <input type="submit" value="Update Jjik" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        )
      ) : (
        <>
          <h4>{jjikObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Jjik</button>
              <button onClick={toggleEditing}>Edit Jjik</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jjik;
