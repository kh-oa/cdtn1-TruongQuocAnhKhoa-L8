
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
      <p>Báo cáo CSAT - Dịch vụ bảo hành L8</p>

      {loading && <p>Đang tải thống kê...</p>}

      {error && (
        <div>
          <p role="alert">{error}</p>
          <button onClick={loadStatistics}>Thử lại</button>
        </div>
      )}

      {!loading && !error && stats && (
        <div className="statistics-grid">
          <div className="stat-card">
            <h3>Tổng khảo sát</h3>
            <strong>{stats.total_surveys}</strong>
          </div>

          <div className="stat-card">
            <h3>Điểm trung bình</h3>
            <strong>{stats.average_rating ?? "Chưa có"}</strong>
          </div>

          <div className="stat-card">
            <h3>Khách hàng hài lòng</h3>
            <strong>{stats.satisfied_count}</strong>
          </div>

          <div className="stat-card">
            <h3>Chỉ số CSAT</h3>
            <strong>
              {stats.csat_percentage === null
                ? "Chưa có"
                : `${stats.csat_percentage}%`}
            </strong>
          </div>
        </div>
      )}

      {!loading && !error && stats?.total_surveys === 0 && (
        <p>Chưa có dữ liệu khảo sát.</p>
      )}

      <button onClick={loadStatistics} disabled={loading}>
        Làm mới dữ liệu
      </button>
    </div>
  );
}

export default Statistics;
