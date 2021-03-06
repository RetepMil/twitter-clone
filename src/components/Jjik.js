import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Jjik = ({ jjikObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJjik, setnewJjik] = useState(jjikObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this jjik?");
    if (ok) {
      await dbService.doc(`jjiks/${jjikObj.id}`).delete();
      await storageService.refFromURL(jjikObj.attachmentUrl).delete();
    }
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
    <div key={jjikObj.id} className="nweet">
      {editing ? (
        isOwner && (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input
                type="text"
                placeholder="Edit your jjik"
                value={newJjik}
                onChange={onChange}
                required
              />
              <input type="submit" value="Update Jjik" className="formBtn" />
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn">
              Cancel
            </button>
          </>
        )
      ) : (
        <>
          <h4>{jjikObj.text}</h4>
          {jjikObj.attachmentUrl && (
            <img src={jjikObj.attachmentUrl} alt="no" />
          )}
          {isOwner && (
            <>
              <div className="nweet__actions">
                <button onClick={onDeleteClick}>Delete Jjik</button>
                <button onClick={toggleEditing}>Edit Jjik</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jjik;
