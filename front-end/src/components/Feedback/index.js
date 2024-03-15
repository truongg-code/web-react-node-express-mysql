import React from "react";
import "./feedback.scss";
import { useState, useEffect } from "react";

const users_list = [
  [
    {
      text: "very fast delivery nice products definitely recommended from my side 🙂",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1689798910_9800169673357947.jpg",
    },
    {
      text: "Very fast services ,highly recommended and products are very very Good",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1689596101_6286984714683785.jpg",
    },
    {
      text: "New Themes in Reasonable Rates! Highly Recommended 🍩",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1687772749_6259815770779469.jpg",
    },
  ],
  [
    {
      text: "alhamdulillah I ordered more than 5 birthday theme they are all amazing and good quality ❤️❤️ highly recommended",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1687497654_6609992369021133.jpg",
    },
    {
      text: "Very good experience with dream party. Highly recommended. All items promised are delivered. i shop again in sha Allah.😇",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1686975211_6551267494925231.jpg",
    },
    {
      text: "amazing quality and quantity of material at an affordable price. I ordered mermaid theme decorations and everything was spot on.... read more",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1686548112_6867923329904589.jpg",
    },
  ],
  [
    {
      text: "outstanding quality highly recommended 💕👍",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1685168613_6814403021911862.jpg",
    },
    {
      text: "awesome service.thanks dream party to make my kids birthday Soo special 🎈🎉.. highly recommend.i will shop again inshallah",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1684518284_6604049199634761.jpg",
    },
    {
      text: "Very good experience with dream party. Highly recommended. All items promised are delivered. Their quality is also very good",
      img_url:
        "https://app.testimonialhub.com/resources/public/avatars/15120/1684480497_9513920018677962.jpg",
    },
  ],
];

const Feedback = () => {
  const [actIdx, setActIdx] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (actIdx === users_list.length - 1) {
        setActIdx(0);
      } else setActIdx(actIdx + 1);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <div className="feedback">
      {users_list.map((userArr, idx) => (
        <div
          key={idx}
          className={`testimonial ${actIdx === idx ? "active" : ""}`}
        >
          {userArr.map((user, subIdx) => (
            <div className="evaluation" key={subIdx}>
              <div className="review">
                <blockquote>
                  <img
                    className="five_star"
                    alt="5 star rating"
                    src="https://app.testimonialhub.com/resources/public/imgs//stars_5_yellow.png"
                    width={100}
                    height={20}
                  />
                  {user.text}
                </blockquote>
              </div>
              <div id="triangle"></div>
              <img
                src={user.img_url}
                alt="Avatar"
                width={70}
                height={70}
                className="avatar"
              />
            </div>
          ))}
        </div>
      ))}
      <div className="slider-nav">
        {users_list.map((userArr, idx) => (
          <div
            key={idx}
            className={`btn-circle ${actIdx === idx ? "active" : ""}`}
            onClick={() => setActIdx(idx)}
          ></div>
        ))}
      </div>
      <div
        className="prev"
        onClick={() => {
          if (actIdx === 0) setActIdx(users_list.length - 1);
          else setActIdx(actIdx - 1);
        }}
      >
        ❮
      </div>
      <div
        className="next"
        onClick={() => {
          if (actIdx === users_list.length - 1) setActIdx(0);
          else setActIdx(actIdx + 1);
        }}
      >
        ❯
      </div>
    </div>

    // <div id="evaluation">
    //   <div className="review">
    //     <blockquote>
    //       <img
    //         className="five_star"
    //         alt="5 star rating"
    //         src="https://app.testimonialhub.com/resources/public/imgs//stars_5_yellow.png"
    //         width={100}
    //         height={20}
    //       />
    //       Everything they send is exactly as advertised. Quality is top notch.
    //       Value for money. And customer service responds promptly to... read
    //       more
    //     </blockquote>
    //   </div>
    //   <div id="triangle"></div>
    //   <img
    //     src="https://app.testimonialhub.com/resources/public/avatars/15120/1670053737_5826125300782414.jpg"
    //     alt="Avatar"
    //     width={70}
    //     height={70}
    //     className="avatar"
    //   ></img>
    // </div>
  );
};

export default Feedback;
