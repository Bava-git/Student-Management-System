import { useState } from 'react';
import * as ApiHub from '../../utilities/ApiHub';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {

    const [username, setUsername] = useState('');
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const Navigate = useNavigate();

    const handleCredential = async (e) => {
        e.preventDefault();

        // Validate username
        if (username.length < 3 || username.length > 30) {
            toast.error("Username must be between 3 to 30 characters long!");
            return;
        }

        // Validate password
        if (oldpassword.length < 4 || oldpassword.length > 30) {
            toast.error("Password must be between 4 to 30 characters long!");
            return;
        }

        if (newpassword.length < 4 || newpassword.length > 30) {
            toast.error("Password must be between 4 to 30 characters long!");
            return;
        } else if (newpassword != confirmpassword) {
            toast.error("Password mismatch, please update correctly");
            return;
        }

        let userData = {
            username,
            oldPassword: oldpassword,
            newPassword: newpassword,
        }

        // console.log(registerData);

        ApiHub.Save("user/changepassword", userData).then((status) => {
            if (status === 200) {
                toast.success("Password changed successfully!");
                Navigate("/");
            }
        });
    }

    return (
        <div className="formcontainer">
            <div className='formelements'>
                <h2 className='form-title'>Change password</h2>
                <div className="formelements-field">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" autoComplete='off' required
                        onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="formelements-field">
                    <label htmlFor="oldpassword">Old Password:</label>
                    <input type="password" name="oldpassword" id="oldpassword" autoComplete='off' required
                        onChange={(e) => { setOldPassword(e.target.value) }} />
                </div>
                <div className="formelements-field">
                    <label htmlFor="newpassword">New Password:</label>
                    <input type="password" name="newpassword" id="newpassword" autoComplete='off' required
                        onChange={(e) => { setNewPassword(e.target.value) }} />
                </div>
                <div className="formelements-field">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input type="password" name="confirmpassword" id="confirmpassword" autoComplete='off' required
                        onChange={(e) => { setConfirmPassword(e.target.value) }} />
                </div>
                <div className="formelements-field">
                    <div></div>
                    <button className='form-submitBn' onClick={(e) => { handleCredential(e) }}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;

