import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user") || "null");

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/");
};

return ( <main style={styles.page}> <section style={styles.card}> <h1>Welcome to AuthLab!</h1>
    <p>You have successfully logged in with Google.</p>

    <div style={styles.info}>
      <p>
        <strong>Name:</strong> {user?.userName || "User"}
      </p>

      <p>
        <strong>Email:</strong> {user?.email || "Not available"}
      </p>

      <p>
        <strong>Provider:</strong> {user?.provider || "Google"}
      </p>
    </div>

    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  </section>
</main>

);
}

const styles = {
page: {
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#f4f4f4",
fontFamily: "Arial, sans-serif",
padding: "20px",
},

card: {
width: "100%",
maxWidth: "500px",
background: "#fff",
padding: "32px",
borderRadius: "12px",
boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
},

info: {
background: "#f8fafc",
padding: "12px 18px",
borderRadius: "8px",
margin: "20px 0",
overflowWrap: "anywhere",
},

button: {
width: "100%",
padding: "12px",
background: "#222",
color: "#fff",
border: "none",
borderRadius: "6px",
cursor: "pointer",
},
};

export default Dashboard;
