import React, { Component } from "react";

class PhoneNav extends Component {
  state = {
    isClicked: true
  };

  handlerGenresNav() {
    let isClicked = this.state.isClicked;

    isClicked ? (isClicked = false) : (isClicked = true);

    this.setState({ isClicked });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isClicked ? (
          <div
            className="phone-nav-container"
            onClick={() => this.handlerGenresNav()}
          >
            <p>Genres</p>
            <div style={{ fontSize: "2rem" }}>
              <i className="fa fa-caret-down" />
            </div>
          </div>
        ) : (
          <React.Fragment>
            <nav className="phone-nav">
              <ul className="phone-navigation">
                {this.props.items.map(item => (
                  <li
                    key={item.id}
                    className="phone-navigation__item"
                    onClick={() => this.props.onItemSelect(item)}
                  >
                    <a
                      className={
                        item === this.props.selectedItem
                          ? "phone-navigation__link phone-navigation__link--active"
                          : "phone-navigation__link"
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              className="phone-nav-container"
              onClick={() => this.handlerGenresNav()}
            >
              <p>Genres</p>
              <div style={{ fontSize: "2rem" }}>
                <i className="fa fa-caret-up" />
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default PhoneNav;
