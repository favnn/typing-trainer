import React, { useState, useEffect, useRef } from 'react';
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
  const chartScrollRef = useRef(null);
  const dashboardRef = useRef(null);

  const [visibleLines, setVisibleLines] = useState({
    wpm: true,
    raw: true,
    burst: true,
    errors: true
  });

  useEffect(() => {
    if (!stats) return;

    const timerId = setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => clearTimeout(timerId);
  }, [stats]);

  useEffect(() => {
    if (!stats || !chartScrollRef.current) return;

    const timerId = setTimeout(() => {
      const chartContainer = chartScrollRef.current;
      chartContainer.scrollTo({
        left: chartContainer.scrollWidth,
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timerId);
  }, [stats, typingHistory]);

  if (!stats) return null;

  const toggleLine = (line) => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  // Формируем данные для графика с шагом 1 секунда
  const maxSecondFromHistory = typingHistory.length > 0
    ? Math.max(...typingHistory.map(item => Math.round(item.second || 0)))
    : 0;

  const totalSeconds = Math.max(
    1,
    Math.round(stats.duration || 0),
    maxSecondFromHistory
  );

  const historyBySecond = {};
  typingHistory.forEach(item => {
    const second = Math.round(item.second || 0);
    historyBySecond[second] = item;
  });

  let lastPoint = {
    wpm: 0,
    raw: 0,
    burst: 0,
    errors: 0
  };

  const normalizedHistory = [];

  for (let second = 1; second <= totalSeconds; second++) {
    if (historyBySecond[second]) {
      lastPoint = {
        ...lastPoint,
        ...historyBySecond[second]
      };
    }

    normalizedHistory.push({
      second,
      wpm: lastPoint.wpm,
      raw: lastPoint.raw,
      burst: lastPoint.burst,
      errors: lastPoint.errors
    });
  }

  let labels = normalizedHistory.map(item => `${item.second}c`);
  let wpmData = normalizedHistory.map(item => item.wpm);
  let rawData = normalizedHistory.map(item => item.raw);
  let burstData = normalizedHistory.map(item => item.burst);
  let errorsData = normalizedHistory.map(item => item.errors);
  const chartWidth = Math.max(620, labels.length * 42);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'WPM (слов в минуту)',
        data: wpmData,
        borderColor: '#4895ef',
        backgroundColor: 'rgba(72, 149, 239, 0.1)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#4895ef',
        tension: 0.3,
        fill: false,
        hidden: !visibleLines.wpm
      },
      {
        label: 'RAW (сырая скорость)',
        data: rawData,
        borderColor: '#cbd0df',
        backgroundColor: 'rgba(203, 208, 223, 0.1)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#cbd0df',
        tension: 0.3,
        fill: false,
        hidden: !visibleLines.raw
      },
      {
        label: 'BURST (макс. рывок)',
        data: burstData,
        borderColor: '#8a94a5',
        backgroundColor: 'rgba(138, 148, 165, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#8a94a5',
        tension: 0.3,
        fill: false,
        hidden: !visibleLines.burst
      },
      {
        label: 'Ошибки',
        data: errorsData,
        borderColor: '#ff6b81',
        backgroundColor: '#ff6b81',
        pointRadius: 8,
        pointBackgroundColor: '#ff6b81',
        pointBorderColor: '#22272e',
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
        backgroundColor: '#272e35',
        titleColor: '#cbd0df',
        bodyColor: '#cbd0df'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 120,
        title: {
          display: true,
          text: 'скорость (символов/мин)',
          color: '#6d7887'
        },
        grid: { color: 'rgba(203,208,223,0.08)' }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'время (секунды)',
          color: '#6d7887'
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          color: '#6d7887'
        },
        grid: { color: 'rgba(203,208,223,0.08)' }
      }
    }
  };

  const styles = {
    container: {
      background: '#272e35',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0 0',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    title: {
      color: '#6d7887',
      marginBottom: '1rem',
      fontSize: '1.2rem'
    },
    mainStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid rgba(203,208,223,0.08)'
    },
    mainStatCard: { textAlign: 'center' },
    mainStatValue: { fontSize: '3rem', fontWeight: 'bold', color: '#cbd0df', lineHeight: 1.2 },
    mainStatLabel: { fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    statCard: {
      background: '#22272e',
      borderRadius: '8px',
      padding: '0.8rem',
      textAlign: 'center'
    },
    statValue: { fontSize: '1.5rem', fontWeight: 'bold', color: '#cbd0df' },
    statLabel: { fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' },
    statSub: { fontSize: '0.7rem', color: '#6d7887' },
    bottomStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(203,208,223,0.08)'
    },
    bottomStat: { display: 'flex', alignItems: 'baseline', gap: '0.5rem' },
    bottomStatLabel: { fontSize: '0.8rem', opacity: 0.6 },
    bottomStatValue: { fontSize: '1.2rem', fontWeight: 'bold', color: '#cbd0df' },
    legend: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '1rem',
      justifyContent: 'center',
      padding: '0.5rem',
      background: '#22272e',
      borderRadius: '8px'
    },
    legendBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.3rem 0.8rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.8rem',
      transition: 'all 0.2s',
      background: 'transparent',
      color: '#6d7887'
    },
    legendBtnActive: { background: 'rgba(72, 149, 239, 0.1)', border: '1px solid rgba(72, 149, 239, 0.4)', color: '#4895ef' },
    legendColor: { width: '16px', height: '16px', borderRadius: '4px' },
    problemKeys: {
      marginTop: '1rem',
      padding: '0.8rem',
      background: 'rgba(255, 107, 129, 0.14)',
      borderRadius: '8px',
      fontSize: '0.8rem',
      border: '1px solid rgba(255, 107, 129, 0.35)'
    },
    chartContainer: { margin: '1rem 0', overflowX: 'auto', paddingBottom: '0.4rem', scrollBehavior: 'smooth' }
  };

  const consistency = stats.accuracy > 0 
    ? Math.min(Math.round((stats.wpm / (stats.raw || stats.wpm)) * 100), 100) 
    : 0;

  const Glossary = () => (
    <div style={{ marginTop: '1rem', fontSize: '0.7rem', opacity: 0.6, borderTop: '1px solid rgba(203,208,223,0.08)', paddingTop: '0.8rem' }}>
      <div><strong style={{ color: '#4895ef' }}>WPM</strong> — Words Per Minute (слов в минуту) — основная скорость печати</div>
      <div><strong style={{ color: '#cbd0df' }}>RAW</strong> — сырая скорость печати без учёта ошибок</div>
      <div><strong style={{ color: '#8a94a5' }}>BURST</strong> — максимальная скорость рывками (пиковые значения)</div>
      <div><strong style={{ color: '#ff6b81' }}>Ошибки</strong> — красные точки показывают моменты, когда были допущены ошибки</div>
    </div>
  );

  return (
    <div ref={dashboardRef} style={styles.container}>
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

      <Glossary />
      
      <div style={styles.legend}>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.wpm ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('wpm')}
        >
          <div style={{...styles.legendColor, background: '#4895ef'}}></div>WPM
        </button>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.raw ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('raw')}
        >
          <div style={{...styles.legendColor, background: '#cbd0df'}}></div>RAW
        </button>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.burst ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('burst')}
        >
          <div style={{...styles.legendColor, background: '#8a94a5'}}></div>BURST
        </button>
        <button 
          style={{...styles.legendBtn, ...(visibleLines.errors ? styles.legendBtnActive : {})}}
          onClick={() => toggleLine('errors')}
        >
          <div style={{...styles.legendColor, background: '#ff6b81'}}></div>Ошибки
        </button>
      </div>
      
      <div ref={chartScrollRef} style={styles.chartContainer}>
        <div style={{ minWidth: `${chartWidth}px` }}>
          <Line data={chartData} options={chartOptions} height={150} />
        </div>
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
      
      {stats.problemKeys && stats.problemKeys.length > 0 && (
        <div style={styles.problemKeys}>
          <strong>Проблемные клавиши:</strong> {stats.problemKeys.join(', ')}
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;
