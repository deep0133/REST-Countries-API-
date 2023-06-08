/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function Detail({ text, bg, details, input }) {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(`/`);
  };

  return (
    <div
      className={`detail-section w-full box-border px-[10%] sm:px-[5%] md:flex-row md:justify-center p-5 md:items-center md:space-x-8 ${
        bg + " " + text
      }`}>
      <div className="grid grid-cols-12 gap-6">
        <div className="go-back col-span-full">
          <button
            onClick={goBackHandler}
            className={`flex ${input} px-5 rounded-md py-2 shadow-sm`}>
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </span>
            Back
          </button>
        </div>
        <div className="flag sm:col-span-6 col-span-full">
          <img
            src={details.flags.png}
            className="w-full min-[750px]:max-w-sm object-cover mx-auto"
            alt="flag"
          />
        </div>
        <div className="content font-semibold sm:col-span-6 col-span-full">
          <div className="font-bold text-xl mb-4">{details.name.common}</div>
          <div className="">
            <div className="list flex w-full flex-col sm:flex-row space-y-6 sm:space-y-0">
              <div className="space-y-2 basis-1/2">
                <p>
                  Native Name:{" "}
                  <span className="font-normal">
                    {details &&
                    details.name.nativeName &&
                    Object.keys(details.name.nativeName)[0]
                      ? details.name.nativeName[
                          Object.keys(details.name.nativeName)[0]
                        ].common
                      : "---"}
                  </span>
                </p>
                <p>
                  Population:{" "}
                  <span className="font-normal">
                    {details.population ? details.population : "---"}
                  </span>
                </p>
                <p>
                  Region:{" "}
                  <span className="font-normal">
                    {details.region ? details.region : "---"}
                  </span>
                </p>
                <p>
                  Sub Region:{" "}
                  <span className="font-normal">
                    {details.subregion ? details.subregion : "---"}
                  </span>
                </p>
                <p>
                  Capital:{" "}
                  <span className="font-normal">
                    {details.capital ? details.capital : "---"}
                  </span>
                </p>
              </div>
              <div className="space-y-2 basis-1/2">
                <p>
                  Top Level Domain :{" "}
                  <span className="font-normal">
                    {details.tld ? details.tld[0] : "---"}
                  </span>
                </p>
                <p>
                  Currencies :{" "}
                  <span className="font-normal">
                    {details.currencies
                      ? details.currencies[Object.keys(details.currencies)[0]]
                          .name
                      : "---"}
                  </span>
                </p>
                <p>
                  Languages:{" "}
                  <span className="font-normal">
                    {details.languages
                      ? Object.keys(details.languages).map((key) => (
                          <span key={key}>{details.languages[key]}</span>
                        ))
                      : "---"}
                  </span>
                </p>
              </div>
            </div>
            <div className="country-border my-5 basis-full space-x-4 flex space-y-2 flex-wrap">
              <h1 className="mt-3">Border Countries:</h1>{" "}
              <div className="flex flex-wrap "></div>
              {details.borders
                ? details.borders.map((border, index) => {
                    return (
                      <p
                        key={index}
                        className={`font-normal w-fit ${input} shadow-sm rounded-md px-3 py-1`}>
                        {border}
                      </p>
                    );
                  })
                : "---"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
