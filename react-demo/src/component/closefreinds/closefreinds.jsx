import "./closefreinds.css"
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function closefreinds({ clf }) {
  return (
    <li className="sidebarfreind">
      <img src={PF+clf.profilepicture} alt="Retry" className="sidebarfreindimg" />
      <span className="sidebarfreindname">{clf.username}</span>
    </li>

  );
}
