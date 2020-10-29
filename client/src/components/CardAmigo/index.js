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
        <div className="col-lg-2 col-md-2 col-sm-3">
          <button className="btn btn-info btn-circle pull-right">
            <i className="fas fa-user-plus fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardAmigo;
