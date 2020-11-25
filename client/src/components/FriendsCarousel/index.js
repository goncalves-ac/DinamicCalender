import React from "react";
import settings from "./carouselSettings";
import FriendCard from "./FriendCard";
import Slider from "react-slick";
import "./styles.css";

const PrevArrow = ({ onClick }) => {
  return (
    <span
      onClick={onClick}
      className="friends-carousel-arrow friends-carousel-prev-arrow"
    >
      <i className="fas fa-arrow-left" />
    </span>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <span
      onClick={onClick}
      className="friends-carousel-arrow friends-carousel-next-arrow"
    >
      <i className="fas fa-arrow-right" />
    </span>
  );
};

const FriendsCarousel = ({
  friends,
  loading,
  mode,
  uninviteCallback,
  invitesMapping,
}) => {
  const sliderRef = React.createRef();

  const next = () => {
    sliderRef.current.slickNext();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
  };

  if (loading)
    return (
      <span className="friendlist-loading loading-spinner">
        <i className="fas fa-spinner fa-2x" />
      </span>
    );

  if (friends.length < 1) {
    return <p className="no-friends-warning">Não há amigos convidados</p>;
  }

  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {friends.map((friend) => (
          <FriendCard
            key={friend.idUsuario}
            friend={friend}
            mode={mode}
            uninviteCallback={uninviteCallback}
            status={invitesMapping && invitesMapping[friend.idUsuario]}
          />
        ))}
      </Slider>
      {friends.length >= 4 && (
        <>
          <PrevArrow onClick={prev} />
          <NextArrow onClick={next} />
        </>
      )}
    </>
  );
};

export default FriendsCarousel;
