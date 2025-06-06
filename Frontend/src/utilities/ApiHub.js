import axios from "axios";
const baseURL = "http://localhost:3000";

// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const GetOneById = async (directURL, ID, DebugResponse) => {
    try {

        let response = await axios.get(`${baseURL}/${directURL}/${ID}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
        }

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

export const GetAll = async (directURL, DebugResponse) => {

    try {

        let response = await axios.get(`${baseURL}/${directURL}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
        }

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


export const Save = async (directURL, saveData, DebugResponse) => {
    try {

        let response = await axios.post(`${baseURL}/${directURL}`, saveData, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
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

export const SaveAll = async (directURL, saveData, DebugResponse) => {
    try {

        let response = await axios.post(`${baseURL}/${directURL}`, saveData, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
        }

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

export const Delete = async (directURL, ID, DebugResponse) => {
    try {

        let response = await axios.delete(`${baseURL}/${directURL}/delete/${ID}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
        }

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

export const Update = async (directURL, saveData, DebugResponse) => {
    try {

        let response = await axios.put(`${baseURL}/${directURL}`, saveData, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
        }

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


// ((((((((((((((((((((((((()))))))))))))))))))))))))

export const UploadData = async (directURL, saveData, DebugResponse) => {
    try {

        let response = await axios.post(`${baseURL}/${directURL}`, saveData, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
                "Content-Type": "multipart/form-data",
            }
        })

        if (DebugResponse) {
            DebugResponse(response);
        }

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

const DebugResponse = (response) => {

    console.log("From DebugResponse" + response);
    console.log("From DebugResponse" + response.data);
    console.log("From DebugResponse" + response.status);

}

// ((((((((((((((((((((((((()))))))))))))))))))))))))