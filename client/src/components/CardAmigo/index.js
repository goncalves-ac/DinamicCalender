import React from "react";

const CardAmigo = ({ userInfo }) => {
  const { avatarUrl, userName, profileLink, userDesc } = userInfo;

  return (
    <div className="nearby-user">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-9">
          <img alt="user" className="profile-photo-lg" src={avatarUrl} />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-12">
          <h5>
            <a className="profile-link" href={profileLink}>
              {userName}
            </a>
          </h5>
          <p>{userDesc}</p>
        </div>
        <div className="d-flex col-lg-2 col-md-2 col-sm-3">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button type="button" className="btn btn-primary my-bg-orange-1 btn-height"><i className="fas fa-user"></i></button>
            <button type="button" className="btn btn-primary btn-danger btn-height"><i className="fas fa-user-alt-slash"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAmigo;
