import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const JjikFactory = ({ userObj }) => {
  const [jjik, setJjik] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const ajjik = {
      text: jjik,
      createdAt: Date.now(),
      createrId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("jjiks").add(ajjik);
    setJjik("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJjik(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment();
  return (
    <form onSubmit={onSubmit}>
      <input
        value={jjik}
        onChange={onChange}
        type="text"
        placeholder="하고 싶은 말 여기에 찍쓰!"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="JJik" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="no" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default JjikFactory;
