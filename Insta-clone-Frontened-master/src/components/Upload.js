import React from "react";
import Header from "./Header"
import { useNavigate } from "react-router-dom";
import "../Upload.css"
const API_KEY = process.env.REACT_APP_API || "http://localhost:3001"


const Upload = () => {
    const navigate = useNavigate("/");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const name = event.target.elements.name.value;
            const location = event.target.elements.location.value;
            const description = event.target.elements.description.value;

            const formData = new FormData();
            formData.append("name", name);
            formData.append("location", location);
            formData.append("description", description);
            const file = event.target.elements.PostImage.files[0];
            formData.append("PostImage", file);

            await fetch(API_KEY + '/post', {
                method: "POST",
                body: formData,
            }).then((res) => res.json())
                .then(() => console.log("Post created"))
                .catch((err) => console.log(err))
                .finally(() => {
                    event.target.reset();
                    navigate("/login")
                })
        } catch (err) {
            console.log("ERROR:", err);
            alert("All form data are mandatory")
            navigate("/post")
        }
    };
    return (
  <>
            <Header />
            <div className="form-container">
            <form action={API_KEY + '/post'} encType='multipart/form-data' method="post" onSubmit={handleSubmit}>
                <input type="file" name="image" id="PostImage" required />
                <input type="text" id="name" placeholder="Author" required />
                <input type="text" id="location" placeholder="location" required />
                <input type="text" id="description" placeholder="description" className="description" required />
                <button type="submit"> Post </button>
            </form>
        </div>
        </>
    )
}

export default Upload
