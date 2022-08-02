import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';
import CustomTable from '../CustomTable/CustomTable';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: ''
}

function App({signOut,user}) {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null
  });

  const handleRemoveClick = ({ index }) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);

        setUsers(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null
        })
      } else {
        setUsers((prevState) => [...prevState, userData]);
      }

      setUserData(initialValues)
    }
  }

  const handleCleanClick = () => {
    setUserData(initialValues);
    setEditableUserData({
      isEdit: false,
      userIndex: null
    })
  };

  const handleEditClick = ({ user, index }) => {
    setUserData(user);
    setEditableUserData({
      isEdit: true,
      userIndex: index
    })
  }

  const handleInputChange = (e, userName) => setUserData((prevState) => ({
    ...prevState,
    [userName]: e.target.value
  }))

  return (
    <div className="wrapper">
       <div class="sign">
            <button class="a" onClick={signOut}>Sign out</button>
        </div>
      <div className="wrapper-content">
        <div className="table-data">
          <CustomTable
            users={users}
            handleEditClick={handleEditClick}
            handleRemoveClick={handleRemoveClick}
          />
        </div>

        <div>
          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <CustomInput
              placeholder="Name"
              handleChange={handleInputChange}
              value={userData.userName}
              fieldName="userName"
            />

            <CustomInput
              placeholder="Discription"
              handleChange={handleInputChange}
              value={userData.userSurname}
              fieldName="userSurname"
            />

            <CustomInput
              placeholder="City"
              handleChange={handleInputChange}
              value={userData.userSalary}
              fieldName="userSalary"
            />

            <div className="buttons-wrapper">
              <CustomButton
                label="Clean"
                classNames=""
                handleClick={() => {}}
                data={null}
                type="reset"
              />

              <CustomButton
                label={editableUserData.isEdit ? 'Edit' : 'Add'}
                classNames=""
                handleClick={() => {}}
                data={null}
                type="submit"
                disabled={!isFilledFields}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
