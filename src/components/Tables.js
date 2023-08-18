import React, { useState } from "react";

function Tables({ data, setData }) {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [emailError, setEmailError] = useState("");

  const deleteUser = (id) => {
    let users = data;
    let deletedUsers = users.splice(id, 1);
    setData([...users]);
  };

  const editUser = (index, newData) => {
    if (!isValidEmail(newData.email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, ...newData } : item
    );
    setData(updatedData);
    setEditMode(false);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEditClick = (index, item) => {
    setEditedData(item);
    setEditMode(index);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedData({});
    setEmailError("");
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">age</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={`${item.email}_${item.name}`}>
            <th scope="row">{index + 1}</th>
            {editMode === index ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editedData.name || ""}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editedData.age || ""}
                    onChange={(e) =>
                      setEditedData({ ...editedData, age: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editedData.email || ""}
                    onChange={(e) => {
                      setEditedData({ ...editedData, email: e.target.value });
                      setEmailError("");
                    }}
                  />
                  {emailError && <div className="error">{emailError}</div>}
                </td>
                <td>
                  <button onClick={() => editUser(index, editedData)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEditClick(index, item)}>
                    Edit
                  </button>
                  <button onClick={() => deleteUser(index)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tables;
