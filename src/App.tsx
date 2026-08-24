import { useMemo, useState } from 'react';

type Page = 'Обзор' | 'Каналы' | 'Статистика' | 'Публикации' | 'Монетизация' | 'Активность';

const navigation: { label: Page; icon: string; badge?: string }[] = [
  { label: 'Обзор', icon: '◈' },
  { label: 'Каналы', icon: '◉', badge: '4' },
  { label: 'Статистика', icon: '⌁' },
  { label: 'Публикации', icon: '▣', badge: '2' },
  { label: 'Монетизация', icon: '◌' },
  { label: 'Активность', icon: '◷' },
];

const channels = [
  { name: 'Future Atlas', handle: '@futureatlas', followers: '124.8K', views: '1.82M', growth: '+18.6%', status: 'Синхронизирован', tone: 'cyan', initials: 'FA' },
  { name: 'Money Lens', handle: '@moneylens', followers: '68.2K', views: '842K', growth: '+12.4%', status: 'Синхронизирован', tone: 'violet', initials: 'ML' },
  { name: 'Daily Formula', handle: '@dailyformula', followers: '9.4K', views: '126K', growth: '+8.1%', status: 'Почти монетизирован', tone: 'pink', initials: 'DF' },
  { name: 'Signal Lab', handle: '@signallab', followers: '3.1K', views: '48K', growth: '+3.8%', status: 'Нужна авторизация', tone: 'amber', initials: 'SL' },
];

const videos = [
  { title: 'Почему привычки сильнее мотивации', channel: 'Future Atlas', views: '428.4K', engagement: '12.8%', status: 'Опубликовано', date: 'Сегодня, 12:40' },
  { title: '5 финансовых ошибок до 30', channel: 'Money Lens', views: '214.8K', engagement: '9.6%', status: 'Опубликовано', date: 'Вчера, 18:20' },
  { title: 'Как перестать откладывать жизнь', channel: 'Daily Formula', views: '—', engagement: '—', status: 'Запланировано', date: 'Завтра, 10:00' },
];

function MetricCard({ label, value, change, detail }: { label: string; value: string; change: string; detail: string }) {
  return <article className="metric-card">
    <p className="eyebrow">{label}</p>
    <div className="metric-line"><strong>{value}</strong><span className="positive">↗ {change}</span></div>
    <p className="muted">{detail}</p>
  </article>;
}

function Overview() {
  return <>
    <section className="hero-row">
      <div>
        <p className="eyebrow accent-text">ПОРТФЕЛЬ · ВСЕ КАНАЛЫ</p>
        <h1>Доброе утро, Wareon.</h1>
        <p className="subtitle">За последние 7 дней портфель растёт быстрее обычного. Сфокусируйся на двух готовых публикациях и канале Daily Formula.</p>
      </div>
      <button className="primary-button"><span>+</span> Новая публикация</button>
    </section>

    <section className="metrics-grid">
      <MetricCard label="Просмотры" value="2.84M" change="21.4%" detail="против предыдущих 7 дней" />
      <MetricCard label="Новые подписчики" value="+12,486" change="16.8%" detail="за выбранный период" />
      <MetricCard label="Средний engagement" value="10.7%" change="2.1 п.п." detail="по опубликованным роликам" />
      <MetricCard label="Готовность к монетизации" value="78%" change="6%" detail="средняя по 4 каналам" />
    </section>

    <section className="content-grid">
      <article className="panel performance-panel">
        <div className="panel-header"><div><p className="eyebrow">ДИНАМИКА ПОРТФЕЛЯ</p><h2>Просмотры за 7 дней</h2></div><button className="ghost-button">7 дней⌄</button></div>
        <div className="chart-info"><strong>2,841,268</strong><span className="positive">↗ 21.4%</span></div>
        <div className="chart" aria-label="График роста просмотров">
          <div className="chart-line" />
          <div className="chart-fill" />
          <div className="chart-labels"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>
        </div>
      </article>
      <article className="panel focus-panel">
        <div className="panel-header"><div><p className="eyebrow">ФОКУС НА СЕГОДНЯ</p><h2>Требуют решения</h2></div><span className="counter">3</span></div>
        <div className="focus-list">
          <div className="focus-item"><span className="signal amber" /><div><strong>Daily Formula</strong><p>До 10K подписчиков: осталось 642</p></div><button>Открыть →</button></div>
          <div className="focus-item"><span className="signal cyan" /><div><strong>Ролик готов к отправке</strong><p>«Как перестать откладывать жизнь»</p></div><button>Проверить →</button></div>
          <div className="focus-item"><span className="signal pink" /><div><strong>Signal Lab</strong><p>Нужно переподключить TikTok</p></div><button>Подключить →</button></div>
        </div>
      </article>
    </section>

    <section className="panel channel-panel">
      <div className="panel-header"><div><p className="eyebrow">СОСТОЯНИЕ КАНАЛОВ</p><h2>Каналы в портфеле</h2></div><button className="ghost-button">Все каналы →</button></div>
      <div className="channel-grid">{channels.map(channel => <article className="channel-card" key={channel.handle}>
        <div className="channel-top"><span className={`avatar ${channel.tone}`}>{channel.initials}</span><span className={`state ${channel.tone}`}>{channel.status}</span></div>
        <h3>{channel.name}</h3><p>{channel.handle}</p>
        <div className="channel-kpi"><span><strong>{channel.followers}</strong><small>подписчики</small></span><span><strong>{channel.views}</strong><small>просмотры</small></span></div>
        <div className="mini-progress"><i style={{ width: channel.name === 'Daily Formula' ? '78%' : channel.name === 'Signal Lab' ? '31%' : '100%' }} /></div>
        <div className="channel-footer"><span className="positive">↗ {channel.growth}</span><span>7 дней</span></div>
      </article>)}</div>
    </section>
  </>;
}

function Channels() {
  return <section className="page-section"><div className="hero-row compact"><div><p className="eyebrow accent-text">УПРАВЛЕНИЕ ПОРТФЕЛЕМ</p><h1>Каналы</h1><p className="subtitle">Подключённые TikTok-аккаунты, их синхронизация и сетевые профили.</p></div><button className="primary-button">+ Подключить канал</button></div><div className="channel-grid large">{channels.map(channel => <article className="channel-card" key={channel.handle}><div className="channel-top"><span className={`avatar ${channel.tone}`}>{channel.initials}</span><span className={`state ${channel.tone}`}>{channel.status}</span></div><h3>{channel.name}</h3><p>{channel.handle}</p><div className="channel-kpi"><span><strong>{channel.followers}</strong><small>подписчики</small></span><span><strong>{channel.views}</strong><small>просмотры</small></span></div><div className="mini-progress"><i style={{ width: channel.name === 'Daily Formula' ? '78%' : channel.name === 'Signal Lab' ? '31%' : '100%' }} /></div><div className="channel-footer"><span className="positive">↗ {channel.growth}</span><button className="link-button">Открыть →</button></div></article>)}</div></section>;
}

function Statistics() {
  return <section className="page-section"><div className="hero-row compact"><div><p className="eyebrow accent-text">АНАЛИТИКА</p><h1>Статистика</h1><p className="subtitle">Сравнивай каналы, периоды и результативность контента.</p></div><button className="ghost-button">Все каналы⌄</button></div><section className="metrics-grid"><MetricCard label="Средние просмотры ролика" value="94.7K" change="14.2%" detail="за последние 30 дней"/><MetricCard label="Лучший канал" value="Future Atlas" change="428K" detail="просмотров у топ-ролика"/><MetricCard label="Частота публикаций" value="1.8 / день" change="0.4" detail="в среднем по портфелю"/></section><article className="panel large-chart"><div className="panel-header"><div><p className="eyebrow">ПРИРОСТ ПОДПИСЧИКОВ</p><h2>Сравнение каналов</h2></div><div className="legend"><span><i className="dot cyan"/>Future Atlas</span><span><i className="dot violet"/>Money Lens</span><span><i className="dot pink"/>Daily Formula</span></div></div><div className="comparison-chart"><div className="comparison-line cyan-line"/><div className="comparison-line violet-line"/><div className="comparison-line pink-line"/></div></article></section>;
}

function Publishing() {
  const [selected, setSelected] = useState('Future Atlas');
  return <section className="page-section"><div className="hero-row compact"><div><p className="eyebrow accent-text">КОНТЕНТ-ОПЕРАЦИИ</p><h1>Публикации</h1><p className="subtitle">Подготовь видео, проверь параметры и отправь в выбранный TikTok-канал.</p></div><button className="primary-button">+ Загрузить видео</button></div><section className="publish-grid"><article className="panel compose-panel"><p className="eyebrow">НОВАЯ ПУБЛИКАЦИЯ</p><div className="upload-zone"><span>↑</span><strong>Перетащи видео сюда</strong><p>MP4, до 4 GB · файл не загружается в TikTok без подтверждения</p><button className="ghost-button">Выбрать файл</button></div><label>Канал<select value={selected} onChange={e => setSelected(e.target.value)}>{channels.filter(c => c.name !== 'Signal Lab').map(c => <option key={c.name}>{c.name}</option>)}</select></label><label>Описание<textarea placeholder="Добавь описание, хэштеги и контекст ролика…" /></label><button className="primary-button full">Продолжить к проверке →</button></article><article className="panel"><div className="panel-header"><div><p className="eyebrow">ОЧЕРЕДЬ</p><h2>Последние публикации</h2></div><button className="ghost-button">История →</button></div><div className="video-list">{videos.map(video => <div className="video-row" key={video.title}><div className="video-preview">▶</div><div><strong>{video.title}</strong><p>{video.channel} · {video.date}</p></div><div className="video-metric"><strong>{video.views}</strong><small>просмотры</small></div><span className={`status-pill ${video.status === 'Запланировано' ? 'planned' : ''}`}>{video.status}</span></div>)}</div></article></section></section>;
}

function Monetization() {
  return <section className="page-section"><div className="hero-row compact"><div><p className="eyebrow accent-text">ДОХОД И ГОТОВНОСТЬ</p><h1>Монетизация</h1><p className="subtitle">Трекер показывает путь к условиям программы. Статус и доходы разделены, чтобы не обещать лишнего.</p></div><button className="ghost-button">Обновить статус</button></div><section className="monetization-grid"><article className="panel reward-card"><p className="eyebrow">CREATOR REWARDS · DAILY FORMULA</p><h2>До готовности <span>78%</span></h2><div className="ring"><div><strong>642</strong><small>подписчика<br/>осталось</small></div></div><div className="requirements"><div><span>Подписчики</span><strong>9,358 / 10,000</strong><i><b style={{width:'94%'}} /></i></div><div><span>Просмотры за 30 дней</span><strong>86K / 100K</strong><i><b style={{width:'86%'}} /></i></div><div><span>Оригинальные видео 1+ мин.</span><strong>Подтвердить вручную</strong><i><b style={{width:'58%'}} /></i></div></div></article><article className="panel earnings-panel"><p className="eyebrow">ФИНАНСОВЫЕ ДАННЫЕ</p><h2>Доходы по портфелю</h2><div className="empty-revenue"><span>◌</span><strong>Нет синхронизированных выплат</strong><p>В MVP финансовые данные добавляются вручную или через подтверждённый источник.</p><button className="ghost-button">Добавить запись</button></div></article></section></section>;
}

function Activity() {
  return <section className="page-section"><div className="hero-row compact"><div><p className="eyebrow accent-text">ПРОЗРАЧНОСТЬ СИСТЕМЫ</p><h1>Активность</h1><p className="subtitle">Журнал подключений, синхронизаций, публикаций и важных изменений.</p></div></div><article className="panel timeline">{['Future Atlas: статистика обновлена', 'Публикация «Почему привычки сильнее мотивации» успешно завершена', 'Daily Formula: прогресс монетизации пересчитан', 'Signal Lab: требуется повторная авторизация'].map((item, index) => <div className="timeline-item" key={item}><span className={`signal ${index === 3 ? 'amber' : index === 1 ? 'cyan' : 'violet'}`}/><div><strong>{item}</strong><p>{index === 0 ? '2 минуты назад' : `${index * 2 + 1} часа назад`} · Система</p></div><button className="link-button">Детали →</button></div>)}</article></section>;
}

function App() {
  const [page, setPage] = useState<Page>('Обзор');
  const content = useMemo(() => ({ 'Обзор': <Overview/>, 'Каналы': <Channels/>, 'Статистика': <Statistics/>, 'Публикации': <Publishing/>, 'Монетизация': <Monetization/>, 'Активность': <Activity/> }[page]), [page]);
  return <div className="app-shell"><aside className="sidebar"><a className="brand" href="#top"><span className="brand-mark">N</span><span>Nexus <i>OS</i></span></a><div className="workspace"><span className="workspace-dot"/><div><small>WORKSPACE</small><strong>Wareon Studio</strong></div><button>⌄</button></div><nav>{navigation.map(item => <button key={item.label} className={page === item.label ? 'active' : ''} onClick={() => setPage(item.label)}><span>{item.icon}</span>{item.label}{item.badge && <b>{item.badge}</b>}</button>)}</nav><div className="sidebar-bottom"><button><span>⚙</span>Настройки</button><div className="user"><span>W</span><div><strong>Wareon</strong><small>Owner</small></div><button>⋯</button></div></div></aside><main id="top"><header className="topbar"><button className="search"><span>⌕</span> Поиск каналов, публикаций и действий <kbd>⌘ K</kbd></button><div className="top-actions"><button className="icon-button">◌</button><button className="icon-button notification">◷<i/></button><span className="divider"/><span className="today">24 августа 2026</span></div></header><div className="main-content">{content}</div></main></div>;
}

export default App;
