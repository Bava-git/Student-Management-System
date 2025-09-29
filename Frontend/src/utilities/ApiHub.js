import axios from "axios";
import { toast } from 'sonner';

const baseApi = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
});

baseApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("authtoken");
    if (token) { config.headers.Authorization = `Bearer ${token}` }
    return config;
});

baseApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            alert("Session expired. Please log in again.");
            sessionStorage.clear(); // clear
            window.location.href = "/login";  // Redirect user to login page
        }
        return Promise.reject(error);
    }
);

// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const GetOneById = async (directURL, ID) => {
    try {

        let response = await baseApi.get(`${directURL}/${ID}`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        // if (error.response) {
        //     return error.response.status;
        // }
        console.error(
            "method: GetOneById",
            "directURL: ", directURL,
            "ID: ", ID,
            "Error: ", error);
    }
}

// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const GetAll = async (directURL) => {

    try {

        let response = await baseApi.get(`${directURL}`);

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        // if (error.response) {
        //     return error.response.status;
        // }
        console.error(
            "method: GetAll",
            "directURL: ", directURL,
            "Error: ", error);
    }
}

// ((((((((((((((((((((((((()))))))))))))))))))))))))


export const Save = async (directURL, saveData) => {
    try {

        let response = await baseApi.post(`${directURL}`, saveData);
        if (response.status === 200 && response.data) {
            toast.success(response.data.displayMessage, { duration: 2000 });
        }
        return response.status;

    } catch (error) {
        if (error.response) {
            return error.response.status;
        }
        console.error(
            "method: Save",
            "directURL: ", directURL,
            "saveData: ", saveData,
            "Error: ", error);
    }
}


// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const SaveAll = async (directURL, saveData) => {
    try {

        let response = await baseApi.post(`${directURL}`, saveData);
        return response.status;

    } catch (error) {
        if (error.response) {
            return error.response.status;
        }
        console.error(
            "method: SaveAll",
            "directURL: ", directURL,
            "saveData: ", saveData,
            "Error: ", error);
    }
}


// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const Delete = async (directURL, ID) => {
    try {

        let response = await baseApi.delete(`${directURL}/delete/${ID}`);
        return response.status;

    } catch (error) {
        if (error.response) {
            return error.response.status;
        }
        console.error(
            "method: Delete",
            "directURL: ", directURL,
            "ID: ", ID,
            "Error: ", error);
    }
}


// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const Update = async (directURL, saveData) => {
    try {

        let response = await baseApi.put(`${directURL}`, saveData);
        return response.status;

    } catch (error) {
        if (error.response) {
            return error.response.status;
        }
        console.error(
            "method: Update",
            "directURL: ", directURL,
            "saveData: ", saveData,
            "Error: ", error);
    }
}


// ((((((((((((((((((((((((())))))))))))))))))))))))
export const UploadData = async (directURL, saveData) => {
    try {

        let response = await axios.post(`http://localhost:3000/${directURL}`, saveData, {
            headers: {
                "Authorization": `Bearer ` + sessionStorage.getItem("authtoken"),
                "Content-Type": "multipart/form-data",
            }
        })

        return response.status;

    } catch (error) {
        if (error.response) {
            return error.response.status;
        }
        console.error(
            "method: UploadData",
            "directURL: ", directURL,
            "saveData: ", saveData,
            "Error: ", error);
    }
}

// ((((((((((((((((((((((((()))))))))))))))))))))))))