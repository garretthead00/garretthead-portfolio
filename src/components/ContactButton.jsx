const ContactButton = () => {
  return (
    <button
      className="btn btn-lg"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "#contact";
      }}
    >
      Contact Me
    </button>
  );
};

export default ContactButton
