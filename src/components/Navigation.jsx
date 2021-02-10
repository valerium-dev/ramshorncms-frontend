import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navigation(props) {
    return (
        <div className="navigation">
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        Ramshorn Scholars Program
                    </Link>

                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link class={`nav-link ${props.location.pathname === "/" ? "active" : ""}`} to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link class={`nav-link ${props.location.pathname === "/coaches" ? "active" : ""}`} to="/coaches">
                                    Coaches
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link class={`nav-link ${props.location.pathname === "/students" ? "active" : ""}`} to="/students">
                                    Students
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navigation);
