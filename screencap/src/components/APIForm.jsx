const inputsInfo = [
    "HEY BRO! Which website you want a screenshot of? Do not include https or any protocol in the URL",
    "Which image format you would prefer? : jpeg, png, or webp. THERE IS ONLY ONE CORRECT ANSWER",
    "CAN'T BELIEVE I AM ASKING THIS. Input true or false if you would like your website screenshot to not contain any ads",
    "Input true or false if you would like your website screenshot to not contain those annoying 'allow cookies' banners.",
    "Choose the width of your screenshot (in pixels). PIXEL IS A VERY SMALL UNIT. TRY PLAYING WITH IT A LITTLE",
    "Choose the height of your screenshot (in pixels). ONE RESTRICTION ONLY - CANNOT BE MORE THAN YOUR HEIGHT",
  ];
  
  const APIForm = ({ inputs, handleChange, onSubmit, currentImage }) => {
    return (
      <div>
        <h2>Select Your Image Attributes:</h2>
        <form className="form-container">
          {inputs &&
            Object.entries(inputs).map(([category, value], index) => (
              <li className="form" key={index}>
                <h2>{category}</h2>
                <input
                  type="text"
                  name={category}
                  value={value}
                  placeholder="Input this attribute..."
                  onChange={handleChange}
                  className="textbox"
                />
                <br />
                <br />
                <p>{inputsInfo[index]}</p>
              </li>
            ))}
        </form>
  
        <button type="submit" className="button" onClick={onSubmit}>
          Take that Pic!!
        </button>

        <br></br>
        <br></br>
  
        {currentImage && (
          <img className="screenshot" src={currentImage} alt="Screenshot result" />
        )}
  
        <div className="container">
          <h3>Current Query Status:</h3>
          <p>
            https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
            <br />
            &url={inputs.url} <br />
            &format={inputs.format} <br />
            &width={inputs.width}
            <br />
            &height={inputs.height}
            <br />
            &no_cookie_banners={inputs.no_cookie_banners}
            <br />
            &no_ads={inputs.no_ads}
            <br />
          </p>
        </div>
      </div>
    );
  };
  
  export default APIForm;
  