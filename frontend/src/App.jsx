import { useEffect, useState } from "react";
import Statistics from "./Statistics";
import SurveyList from "./SurveyList";
import "./App.css";

const API = "/api/v1/surveys";
const AUTH_API = "/api/v1/auth/login";

const criteria = [
  "Chất lượng sửa chữa",
  "Thời gian bảo hành",
  "Thái độ nhân viên",
  "Chất lượng phục vụ",
];

const labels = [
  "Rất hài lòng",
  "Hài lòng",
  "Bình thường",
  "Không hài lòng",
  "Rất không hài lòng",
];

// --- 1. COMPONENT ĐĂNG NHẬP ---
function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(AUTH_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const textResponse = await response.text();
      const data = textResponse ? JSON.parse(textResponse) : {};

      if (!response.ok) {
        throw new Error(data.error || data.message || "Đăng nhập thất bại");
      }

      if (!data.token) {
        throw new Error("Server không trả về mã token xác thực");
      }

      // Lưu Token vào localStorage để xác thực các request sau này
      localStorage.setItem("token", data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="survey-page" style={{ maxWidth: "400px", margin: "80px auto" }}>
      <header className="brand">
        <span className="brand-icon">◕</span>
        L8 Warranty Service - Đăng Nhập
      </header>

      <form onSubmit={handleLogin} className="survey-form">
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label className="field-label">Tài khoản</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Nhập tài khoản (vd: admin)"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label className="field-label">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu..."
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {error && <p className="notice" role="status" style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}

// --- 2. COMPONENT KHẢO SÁT CHÍNH ---
function SurveyFormApp() {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [rating, setRating] = useState("");
  const [npsScore, setNpsScore] = useState("");
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API}/eligible-tickets`, {
      headers: {
        // Gắn kèm Token vào header nếu API yêu cầu xác thực
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(async (res) => {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (!res.ok || !data.success) throw new Error(data.message || "Không thể tải phiếu bảo hành");
        setTickets(data.data || []);
      })
      .catch((err) => setMessage(err.message || "Không thể tải phiếu bảo hành"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!ticketId || !rating) {
      setMessage("Vui lòng chọn phiếu và mức độ hài lòng");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const details = criteria
        .filter((item) => answers[item])
        .map((item) => `${item}: ${answers[item]}`)
        .join("; ");

      const response = await fetch(API, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ticket_id: Number(ticketId),
          rating: Number(rating),
          nps_score: npsScore === "" ? null : Number(npsScore),
          feedback: [details, feedback].filter(Boolean).join("\n"),
        }),
      });

      const textResponse = await response.text();
      const result = textResponse ? JSON.parse(textResponse) : {};

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gửi thất bại");
      }

      setMessage("Gửi đánh giá thành công!");
      setTickets((prev) =>
        prev.filter((ticket) => String(ticket.ticket_id) !== ticketId)
      );
      setTicketId("");
      setRating("");
      setNpsScore("");
      setAnswers({});
      setFeedback("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="survey-page">
      <header className="brand">
        <span className="brand-icon">◕</span>
        L8 Warranty Service
      </header>

      <div className="survey-title">Khảo sát hài lòng khách hàng</div>

      <form onSubmit={handleSubmit} className="survey-form">
        <p className="intro">
          Cảm ơn bạn đã sử dụng dịch vụ bảo hành.
          Hãy chia sẻ trải nghiệm của bạn!
        </p>

        <label className="field-label">Chọn phiếu bảo hành</label>
        <select
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          disabled={loading || submitting}
        >
          <option value="">
            {loading ? "Đang tải..." : "Chọn mã phiếu"}
          </option>
          {tickets.map((ticket) => (
            <option key={ticket.ticket_id} value={ticket.ticket_id}>
              - {ticket.ticket_code} {ticket.product_name}
            </option>
          ))}
        </select>

        {!loading && tickets.length === 0 && (
          <p className="notice">
            Hiện không có phiếu bảo hành cần khảo sát.
          </p>
        )}

        <label className="field-label">
          Bạn hài lòng với dịch vụ của chúng tôi ở mức nào?
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Chọn mức độ hài lòng</option>
          <option value="5">5 sao - Rất hài lòng</option>
          <option value="4">4 sao - Hài lòng</option>
          <option value="3">3 sao - Bình thường</option>
          <option value="2">2 sao - Không hài lòng</option>
          <option value="1">1 sao - Rất không hài lòng</option>
        </select>

        <h3>Đánh giá chi tiết dịch vụ</h3>

        <div className="table-scroll">
          <table className="rating-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                {labels.map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((item) => (
                <tr key={item}>
                  <td>{item}</td>
                  {labels.map((label) => (
                    <td key={label}>
                      <input
                        type="radio"
                        name={item}
                        value={label}
                        checked={answers[item] === label}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [item]: label,
                          }))
                        }
                        aria-label={`${item}: ${label}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group" style={{ marginTop: "15px" }}>
          <label className="field-label" htmlFor="nps-score">
            Bạn có sẵn sàng giới thiệu dịch vụ bảo hành
            của chúng tôi cho người khác không?
          </label>
          <select
            id="nps-score"
            value={npsScore}
            onChange={(e) => setNpsScore(e.target.value)}
          >
            <option value="">Chọn điểm NPS (0–10)</option>
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                {i} điểm
              </option>
            ))}
          </select>
        </div>

        <label className="field-label">
          Ý kiến đóng góp thêm (không bắt buộc)
        </label>
        <textarea
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Nhập nhận xét của bạn..."
        />

        <button type="submit" disabled={submitting || loading || !ticketId}>
          {submitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>

        {message && <p className="notice" role="status">{message}</p>}
      </form>
    </div>
  );
}

function MarketingPage() {
  return (
    <div>
      <Statistics />
    </div>
  );
}

// --- 3. MAIN PAGE VÀ ĐIỀU HƯỚNG ĐĂNG NHẬP ---
export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [page, setPage] = useState("survey");

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <nav className="main-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        <div>
          <button onClick={() => setPage("survey")}>
            Khảo sát khách hàng
          </button>
          <button onClick={() => setPage("statistics")}>
            Thống kê Marketing
          </button>
          <button onClick={() => setPage("list")}>
            Danh sách khảo sát
          </button>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }}
          style={{ background: "#e74c3c", color: "white" }}
        >
          Đăng xuất
        </button>
      </nav>

      {page === "survey" && <SurveyFormApp />}
      {page === "statistics" && <MarketingPage />}
      {page === "list" && <SurveyList />}
    </>
  );
}