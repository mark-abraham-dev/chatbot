import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import "./Dropdown.css";

import { USER_ROLES } from "../../consts";

interface DropdownProps {
  userRole: string;
  onChange: (newUserRole: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ userRole, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="dropdown-container">
      <div className="dropdown-content">
        <p className="dropdown-text">{userRole}</p>
        {open ? (
          <ChevronUp
            role="button"
            className="dropdown-button"
            onClick={() => setOpen(false)}
          />
        ) : (
          <ChevronDown
            role="button"
            className="dropdown-button"
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      {open && (
        <div className="dropdown-list">
          {USER_ROLES.filter((item) => item !== userRole).map((item) => (
            <p
              className="dropdown-text"
              key={`item-${item}`}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
