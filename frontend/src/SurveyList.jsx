
import { useEffect, useState } from "react";

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSurveys() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/surveys");

      if (!response.ok) {
        throw new Error("Không thể kết nối API");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error("Không thể lấy danh sách khảo sát");
      }

      setSurveys(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSurveys();
  }, []);

  return (
    <div className="statistics-page">
      <h1>Danh sách khảo sát khách hàng</h1>

      {loading && <p>Đang tải dữ liệu...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={loadSurveys}>Thử lại</button>
        </div>
      )}

      {!loading && !error && surveys.length === 0 && (
        <p>Chưa có khảo sát nào.</p>
      )}

      {!loading && !error && surveys.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className="rating-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Số sao</th>
                <th>Điểm NPS</th>
                <th>Nhận xét</th>
                <th>Ngày gửi</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey) => (
                <tr key={survey.survey_id}>
                  <td>{survey.ticket_code}</td>
                  <td>{survey.rating}/5</td>
                  <td>{survey.nps_score ?? "Chưa đánh giá"}</td>
                  <td>{survey.feedback || "Không có"}</td>
                  <td>
                    {new Date(survey.submitted_at).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SurveyList;
