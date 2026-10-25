
import { useEffect, useState } from "react";

function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStatistics() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/surveys/statistics");

      if (!response.ok) {
        throw new Error("Không thể kết nối API");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error("Không thể lấy thống kê");
      }

      setStats(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatistics();
  }, []);

  return (
    <div className="statistics-page">
      <h1>Thống kê hài lòng khách hàng</h1>
      <p>Báo cáo CSAT/NPS - Dịch vụ bảo hành L8</p>

      {loading && <p>Đang tải thống kê...</p>}

      {error && (
        <div>
          <p role="alert">{error}</p>
          <button onClick={loadStatistics}>
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          <h2>Thống kê CSAT</h2>

          <div className="statistics-grid">
            <div className="stat-card">
              <h3>Tổng khảo sát</h3>
              <strong>{stats.total_surveys}</strong>
            </div>

            <div className="stat-card">
              <h3>Điểm trung bình</h3>
              <strong>
                {stats.average_rating ?? "Chưa có"}
              </strong>
            </div>

            <div className="stat-card">
              <h3>Khách hàng hài lòng</h3>
              <strong>{stats.satisfied_count}</strong>
            </div>

            <div className="stat-card">
              <h3>Chỉ số CSAT</h3>
              <strong>
                {stats.csat_percentage == null
                  ? "Chưa có"
                  : `${stats.csat_percentage}%`}
              </strong>
            </div>
          </div>

          <h2>Thống kê NPS</h2>

          <div className="statistics-grid">
            <div className="stat-card">
              <h3>Tổng lượt NPS</h3>
              <strong>{stats.total_nps ?? 0}</strong>
            </div>

            <div className="stat-card">
              <h3>Promoters (9–10 điểm)</h3>
              <strong>{stats.promoters ?? 0}</strong>
            </div>

            <div className="stat-card">
              <h3>Detractors (0–6 điểm)</h3>
              <strong>{stats.detractors ?? 0}</strong>
            </div>

            <div className="stat-card">
              <h3>Chỉ số NPS</h3>
              <strong>
                {stats.nps_score == null
                  ? "Chưa có dữ liệu"
                  : stats.nps_score}
              </strong>
            </div>
          </div>

          {stats.total_surveys === 0 && (
            <p>Chưa có dữ liệu khảo sát.</p>
          )}

          {stats.total_nps === 0 && (
            <p>
              Chưa có đánh giá NPS. Hãy gửi một khảo sát
              có điểm từ 0 đến 10.
            </p>
          )}
        </>
      )}

      <button
        onClick={loadStatistics}
        disabled={loading}
      >
        {loading ? "Đang tải..." : "Làm mới dữ liệu"}
      </button>
    </div>
  );
}

export default Statistics;
