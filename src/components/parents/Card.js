import React from 'react';

function Card() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-200 font-sans min-h-[400px] max-w-8xl px-6 py-12 mx-auto rounded-md overflow-hidden relative shadow-xl mt-6">
      <div className="flex flex-row justify-center gap-6">
        {/* Card 1 */}
        <div className="text-center px-6 py-10 bg-white/70 rounded-[30px] w-full max-w-[550px] shadow-lg relative">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/mxzqCcoKKhM"
            title="Wheels on the Bus | @CoComelon Nursery Rhymes & Kids Songs"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-64 object-cover rounded-lg"
          ></iframe>
          <div className="mt-6">
            <p className="text-lg text-gray-700">Wheels on the Bus by CoComelon</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="text-center px-6 py-10 bg-white/70 rounded-[30px] w-full max-w-[550px] shadow-lg relative">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ZJ8xsVyeQqU"
            title="Learn Number Counting 1,2,3,4,5,6,7,8,9,10 | Numbers By RV AppStudios"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-64 object-cover rounded-lg"
          ></iframe>
          <div className="mt-6">
            <p className="text-lg text-gray-700">Learn Number Counting from 1 to 20</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="text-center px-6 py-10 bg-white/70 rounded-[30px] w-full max-w-[550px] shadow-lg relative">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/fAoAV6nTrEs"
            title="Learn Colors For Kids | What Color Is It? | Educational Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-64 object-cover rounded-lg"
          ></iframe>
          <div className="mt-6">
            <p className="text-lg text-gray-700">Learn Colors For Kids - Educational Video</p>
          </div>
        </div>
      </div>

      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-50 opacity-40 shadow-2xl"></div>
      <div className="absolute -bottom-6 -left-6 w-44 h-44 rounded-full bg-blue-50 opacity-40 shadow-2xl"></div>
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-50 opacity-40 shadow-2xl"></div>
      <div className="absolute -bottom-6 -right-6 w-44 h-44 rounded-full bg-blue-50 opacity-40 shadow-2xl"></div>
    </div>
  );
}

export default Card;
