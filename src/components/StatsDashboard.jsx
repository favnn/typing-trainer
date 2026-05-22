import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatsDashboard = ({ stats, title, typingHistory = [] }) => {
  const [visibleLines, setVisibleLines] = useState({
    wpm: true,
    raw: true,
    burst: true,
    errors: true
  });

  if (!stats) return null;

  const toggleLine = (line) => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  // Формируем данные для графика из typingHistory
  let labels = typingHistory.map(item => `${item.second}c`);
  let wpmData = typingHistory.map(item => item.wpm);
  let rawData = typingHistory.map(item => item.raw);
  let burstData = typingHistory.map(item => item.burst);
  let errorsData = typingHistory.map(item => item.errors);
  
  // Если данных нет, добавляем нулевую точку
  if (labels.length === 0) {
    labels = ['0c'];
    wpmData = [0];
    rawData = [0];
    burstData = [0];
    errorsData = [0];
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'WPM (слов в минуту)',
        data: wpmData,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#4caf50',
        tension: 0.3,
        fill: false,
        hidden: !visibleLines.wpm
      },
      {
        label: 'RAW (сырая скорость)',
        data: rawData,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#2196f3',
        tension: 0.3,
        fill: false,
        hidden: !visibleLines.raw
      },
      {
        label: 'BURST (макс. рывок)',
        data: burstData,
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#ff9800',
        tension: 0.3,
        fill: false,
        hidden: !visibleLines.burst
      },
      {
        label: '⚠️ Ошибки',
        data: errorsData,
        borderColor: '#f44336',
        backgroundColor: '#f44336',
        pointRadius: 8,
        pointBackgroundColor: '#f44336',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        showLine: false,
        tension: 0,
        hidden: !visibleLines.errors
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#ffd700',
        bodyColor: '#e0e0e0'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 120,
        title: {
          display: true,
          text: 'скорость (символов/мин)',
          color: '#aaa'
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'время (секунды)',
          color: '#aaa'
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '20px',
      padding: '1.5rem',
      margin: '1rem 0',
      backdropFilter: 'blur(10px)'
    },
    title: {
      color: '#ffd700',
      marginBottom: '1rem',
      fontSize: '1.2rem'
    },
    mainStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    mainStatCard: { textAlign: 'center' },
    mainStatValue: { fontSize: '3rem', fontWeight: 'bold', color: '#ffd700', lineHeight: 1.2 },
    mainStatLabel: { fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    statCard: {
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '12px',
      padding: '0.8rem',
      textAlign: 'center'
    },
    statValue: { fontSize: '1.5rem', fontWeight: 'bold', color: '#e0e0e0' },
    statLabel: { fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' },
    statSub: { fontSize: '0.7rem', color: '#aaa' },
    bottomStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    bottomStat: { display: 'flex', alignItems: 'baseline', gap: '0.5rem' },
    bottomStatLabel: { fontSize: '0.8rem', opacity: 0.6 },
    bottomStatValue: { fontSize: '1.2rem', fontWeight: 'bold', color: '#ffd700' },
    legend: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '1rem',
      padding: '0.5rem',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '12px'
    },
    legendBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.8rem',
      transition: 'all 0.2s',
      background: 'rgba(255,255,255,0.1)',
      color: '#e0e0e0'
    },
    legendBtnActive: { background: 'rgba(76, 175, 80, 0.3)', border: '1px solid #4caf50' },
    legendColor: { width: '16px', height: '16px', borderRadius: '4px' },
    problemKeys: {
      marginTop: '1rem',
      padding: '0.8rem',
      background: 'rgba(244, 67, 54, 0.15)',
      borderRadius: '12px',
      fontSize: '0.8rem',
      border: '1px solid rgba(244, 67, 54, 0.3)'
    },
    chartContainer: { margin: '1rem 0' }
  };

  const consistency = stats.accuracy > 0 
    ? Math.min(Math.round((stats.wpm / (stats.raw || stats.wpm)) * 100), 100) 
    : 0;

  const Glossary = () => (
    <div style={{ marginTop: '1rem', fontSize: '0.7rem', opacity: 0.6, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem' }}>
      <div><strong style={{ color: '#4caf50' }}>WPM</strong> — Words Per Minute (слов в минуту) — основная скорость печати</div>
      <div><strong style={{ color: '#2196f3' }}>RAW</strong> — сырая скорость печати без учёта ошибок</div>
      <div><strong style={{ color: '#ff9800' }}>BURST</strong> — максимальная скорость рывками (пиковые значения)</div>
      <div><strong style={{ color: '#f44336' }}>⚠️ Ошибки</strong> — красные точки показывают моменты, когда были допущены ошибки</div>
    </div>
  );

  return (
    <div style={styles.container}>
      {title && <h3 style={styles.title}>{title}</h3>}
      
      <div style={styles.mainStats}>
        <div style={styles.mainStatCard}>
          <div style={styles.mainStatValue}>{stats.wpm || 0}</div>
          <div style={styles.mainStatLabel}>wpm</div>
        </div>
        <div style={styles.mainStatCard}>
          <div style={styles.mainStatValue}>{stats.accuracy || 0}%</div>
          <div style={styles.mainStatLabel}>acc</div>
        </div>
        <div style={styles.mainStatCard}>
          <div style={styles.mainStatValue}>{stats.raw || stats.wpm || 0}</div>
          <div style={styles.mainStatLabel}>raw</div>
        </div>
      </div>
      
      <div style={styles.legend}>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.wpm ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('wpm')}
        >
          <div style={{...styles.legendColor, background: '#4caf50'}}></div>WPM
        </button>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.raw ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('raw')}
        >
          <div style={{...styles.legendColor, background: '#2196f3'}}></div>RAW
        </button>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.burst ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('burst')}
        >
          <div style={{...styles.legendColor, background: '#ff9800'}}></div>BURST
        </button>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.errors ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('errors')}
        >
          <div style={{...styles.legendColor, background: '#f44336'}}></div>⚠️ Ошибки
        </button>
      </div>
      
      <div style={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} height={150} />
      </div>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.type || 'Слова'}</div>
          <div style={styles.statLabel}>test type</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.cpm || 0}</div>
          <div style={styles.statLabel}>characters</div>
          <div style={styles.statSub}>символов/мин</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.burst || stats.wpm || 0}</div>
          <div style={styles.statLabel}>burst</div>
          <div style={styles.statSub}>макс. рывок</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.duration || 0}с</div>
          <div style={styles.statLabel}>time</div>
        </div>
      </div>
      
      <div style={styles.bottomStats}>
        <div style={styles.bottomStat}>
          <span style={styles.bottomStatLabel}>errors:</span>
          <span style={styles.bottomStatValue}>{stats.errorsCount || 0}</span>
        </div>
        <div style={styles.bottomStat}>
          <span style={styles.bottomStatLabel}>wpm:</span>
          <span style={styles.bottomStatValue}>{stats.wpm || 0}</span>
        </div>
        <div style={styles.bottomStat}>
          <span style={styles.bottomStatLabel}>raw:</span>
          <span style={styles.bottomStatValue}>{stats.raw || stats.wpm || 0}</span>
        </div>
        <div style={styles.bottomStat}>
          <span style={styles.bottomStatLabel}>burst:</span>
          <span style={styles.bottomStatValue}>{stats.burst || stats.wpm || 0}</span>
        </div>
        <div style={styles.bottomStat}>
          <span style={styles.bottomStatLabel}>consistency:</span>
          <span style={styles.bottomStatValue}>{consistency}%</span>
        </div>
      </div>
      
      <Glossary />
      
      {stats.problemKeys && stats.problemKeys.length > 0 && (
        <div style={styles.problemKeys}>
          <strong>🔴 Проблемные клавиши:</strong> {stats.problemKeys.join(', ')}
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;