import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null);

  const [prevImages, setPrevImages] = useState([]);

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1245",
      height: "1080",
    };

    if (inputs.url.trim() === "") {
      alert("You forgot to submit a URL!");
      return; // Exit function early
    }

    for (const [key, value] of Object.entries(inputs)) {
      if (value.trim() === "") {
        inputs[key] = defaultValues[key]; // Assign default value if empty
      }
    }

    const makeQuery = () => {
      let wait_until = "network_idle";
      let response_type = "json";
      let fail_on_status = "400%2C404%2C500-511";
      let fullURL = `https://${inputs.url}`;

      let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

      return query;
    };

    let query = makeQuery();
    callAPI(query);
  };

  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const json = await response.json();

      if (!json.url) {
        alert("Oops! Something went wrong. Please try again!");
      } else {
        setCurrentImage(json.url);
        setPrevImages((images) => [...images, json.url]);
        reset();
      }
    } catch (error) {
      console.error("API error:", error);
      alert("API call failed. Check the console for details.");
    }
  };

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
        currentImage={currentImage} // Pass currentImage as a prop
      />

      {currentImage && (
        <div>
          <h2>Screenshot Preview:</h2>
          <img className="screenshot" src={currentImage} alt="Screenshot result" />
        </div>
      )}

      <div className="container">
        <Gallery images={prevImages} />
      </div>
    </div>

    

  );
}

export default App;
