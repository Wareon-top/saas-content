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
    <section className="channel-hero">
      <div><h1>Каналы <span>Демо ×</span></h1><p>Управляйте всеми TikTok-каналами в одном окне.</p></div>
      <button className="primary-button"><span>+</span> Добавить канал</button>
    </section>
    <section className="portfolio-strip">
      <article className="portfolio-card all"><span className="portfolio-icon">⠿</span><strong>Все каналы</strong><small>2.84M просмотров за 7 дней</small></article>
      {channels.slice(0, 3).map(channel => <article className="portfolio-card" key={channel.name}><span className={`avatar ${channel.tone}`}>{channel.initials}</span><strong>{channel.name}</strong><small>{channel.followers} подписчиков</small><button>Открыть канал ↗</button></article>)}
    </section>
    <section className="analytics-layout">
      <article className="analytics-main">
        <div className="analytics-title"><h2>Доход каналов <span>за всё время⌄</span></h2><button className="ghost-button">Все каналы⌄</button></div>
        <div className="chart" aria-label="График роста просмотров">
          <div className="chart-line" />
          <div className="chart-fill" />
          <div className="chart-labels"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>
        </div>
      </article>
    </section>
    <section className="income-card">
      {[['Общий доход','42 992,06 $','violet'],['Доход от монетизации','18 120,09 $','pink'],['Доход от рекламных интеграций','15 659,13 $','cyan'],['Доход от партнёрских ссылок','7 756,04 $','lavender'],['Прочие доходы','1 456,80 $','rose']].map(([name,value,tone]) => <div className="income-row" key={name}><span className="income-check">✓</span><strong>{name}</strong><i className={tone}/><b>{value}</b></div>)}
    </section>
    <section className="panel report-table"><div className="panel-header"><div><p className="eyebrow">ОТЧЁТНОСТЬ</p><h2>Результаты по месяцам</h2></div><button className="ghost-button">Экспорт ↗</button></div><div className="table-head"><span>Дата</span><span>Просмотры</span><span>Подписчики</span><span>Доход</span><span>Статус</span></div>{[['авг. 2026','812 460','+4 286','$ 12 875,20'],['июль 2026','763 384','+3 912','$ 11 921,48'],['июнь 2026','692 127','+3 205','$ 9 746,70'],['май 2026','574 904','+2 844','$ 8 448,52']].map(row => <div className="table-line" key={row[0]}><span><i>⠿</i>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span><b>Синхронизирован</b></div>)}</section>
  </>;
}

function AddChannelModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="connect-modal" onMouseDown={event => event.stopPropagation()}>
    <button className="modal-close" onClick={onClose}>×</button>
    <div className="tiktok-logo">♪</div>
    {step === 1 ? <><p className="eyebrow accent-text">НОВОЕ ПОДКЛЮЧЕНИЕ</p><h2>Подключить TikTok-канал</h2><p className="modal-copy">Авторизация откроется на стороне TikTok. Nexus получит только разрешённые данные профиля, статистики и публикаций — без пароля.</p><div className="permission-list"><span>✓ Основная информация канала</span><span>✓ Аналитика и результаты видео</span><span>✓ Публикация после подтверждения</span></div><button className="primary-button full" onClick={() => setStep(2)}>Продолжить через TikTok →</button><small className="security-note">Вы сможете отключить доступ в любой момент.</small></> : <><span className="success-mark">✓</span><h2>Демо-подключение готово</h2><p className="modal-copy">На следующем этапе здесь появится официальный экран TikTok OAuth. Интерфейс и состояния уже подготовлены.</p><button className="primary-button full" onClick={onClose}>Вернуться к каналам</button></>}
  </section></div>;
}

function ChannelDetail({ channel, onBack }: { channel: typeof channels[number]; onBack: () => void }) {
  const monetization = channel.name === 'Daily Formula' ? 78 : channel.name === 'Signal Lab' ? 31 : 100;
  const recent = videos.filter(video => video.channel === channel.name);
  return <section className="page-section channel-detail">
    <button className="back-button" onClick={onBack}>← Все каналы</button>
    <div className="detail-heading"><div className="detail-identity"><span className={`avatar avatar-large ${channel.tone}`}>{channel.initials}</span><div><div className="title-status"><h1>{channel.name}</h1><span className={`state ${channel.tone}`}>{channel.status}</span></div><p>{channel.handle} · TikTok</p></div></div><div className="detail-actions"><button className="ghost-button">↻ Синхронизировать</button><button className="primary-button">+ Новая публикация</button></div></div>
    <div className="detail-metrics"><MetricCard label="Подписчики" value={channel.followers} change={channel.growth.replace('+','')} detail="за последние 7 дней"/><MetricCard label="Просмотры" value={channel.views} change="21.4%" detail="за последние 30 дней"/><MetricCard label="Engagement" value="10.7%" change="2.1 п.п." detail="средний по роликам"/><MetricCard label="Доход" value={monetization === 100 ? '$4,286' : '—'} change={monetization === 100 ? '14.8%' : '0%'} detail={monetization === 100 ? 'расчётные данные' : 'монетизация не активна'}/></div>
    <div className="detail-layout"><article className="panel detail-chart"><div className="panel-header"><div><p className="eyebrow">ДИНАМИКА КАНАЛА</p><h2>Просмотры и подписчики</h2></div><button className="ghost-button">30 дней⌄</button></div><div className="chart-info"><strong>{channel.views}</strong><span className="positive">↗ 21.4%</span></div><div className="chart"><div className="chart-line"/><div className="chart-fill"/><div className="chart-labels"><span>1 авг.</span><span>6 авг.</span><span>11 авг.</span><span>16 авг.</span><span>21 авг.</span><span>Сегодня</span></div></div></article><article className="panel monetization-summary"><div className="panel-header"><div><p className="eyebrow">МОНЕТИЗАЦИЯ</p><h2>{monetization === 100 ? 'Программа активна' : 'Путь к активации'}</h2></div><span className="percent-badge">{monetization}%</span></div><div className="big-progress"><i style={{width: `${monetization}%`}}/></div><div className="goal-list"><div><span>Подписчики</span><strong>{channel.followers}</strong></div><div><span>Просмотры за 30 дней</span><strong>{channel.views}</strong></div><div><span>Статус программы</span><strong>{monetization === 100 ? 'Подтверждён' : 'В процессе'}</strong></div></div><button className="ghost-button full-width">Открыть условия →</button></article></div>
    <article className="panel channel-videos"><div className="panel-header"><div><p className="eyebrow">КОНТЕНТ</p><h2>Последние публикации</h2></div><button className="ghost-button">Все видео →</button></div>{recent.length ? <div className="video-list">{recent.map(video => <div className="video-row" key={video.title}><div className="video-preview">▶</div><div><strong>{video.title}</strong><p>{video.date}</p></div><div className="video-metric"><strong>{video.views}</strong><small>просмотры</small></div><div className="video-metric"><strong>{video.engagement}</strong><small>engagement</small></div><span className={`status-pill ${video.status === 'Запланировано' ? 'planned' : ''}`}>{video.status}</span></div>)}</div> : <div className="empty-content"><span>▣</span><strong>Публикаций пока нет</strong><p>Загрузите первый ролик или дождитесь синхронизации истории TikTok.</p><button className="primary-button">+ Загрузить видео</button></div>}</article>
  </section>;
}

function Channels() {
  const [selected, setSelected] = useState<typeof channels[number] | null>(null);
  const [showConnect, setShowConnect] = useState(false);
  if (selected) return <ChannelDetail channel={selected} onBack={() => setSelected(null)}/>;
  return <section className="page-section"><div className="hero-row compact"><div><p className="eyebrow accent-text">УПРАВЛЕНИЕ ПОРТФЕЛЕМ</p><h1>Каналы</h1><p className="subtitle">Подключённые TikTok-аккаунты, их статистика, публикации и готовность к монетизации.</p></div><button className="primary-button" onClick={() => setShowConnect(true)}>+ Подключить канал</button></div><div className="channels-toolbar"><div><button className="active">Все каналы <b>4</b></button><button>Активные <b>3</b></button><button>Требуют внимания <b>1</b></button></div><button className="ghost-button">Сортировка: по просмотрам⌄</button></div><div className="channel-grid large">{channels.map(channel => <article className="channel-card interactive" key={channel.handle} onClick={() => setSelected(channel)}><div className="channel-top"><span className={`avatar ${channel.tone}`}>{channel.initials}</span><span className={`state ${channel.tone}`}>{channel.status}</span></div><h3>{channel.name}</h3><p>{channel.handle}</p><div className="channel-kpi"><span><strong>{channel.followers}</strong><small>подписчики</small></span><span><strong>{channel.views}</strong><small>просмотры</small></span></div><div className="mini-progress"><i style={{ width: channel.name === 'Daily Formula' ? '78%' : channel.name === 'Signal Lab' ? '31%' : '100%' }} /></div><div className="channel-footer"><span className="positive">↗ {channel.growth}</span><button className="link-button">Открыть →</button></div></article>)}</div>{showConnect && <AddChannelModal onClose={() => setShowConnect(false)}/>}</section>;
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
  return <div className="app-shell"><aside className="sidebar"><a className="brand" href="#top"><span className="brand-mark">N</span><span>Nexus <i>OS</i></span></a><div className="workspace"><span className="workspace-dot"/><div><small>WORKSPACE</small><strong>Wareon Studio</strong></div><button>⌄</button></div><nav>{navigation.map(item => <button key={item.label} className={page === item.label ? 'active' : ''} onClick={() => setPage(item.label)}><span>{item.icon}</span>{item.label}{item.badge && <b>{item.badge}</b>}</button>)}</nav><div className="sidebar-bottom"><button><span>⚙</span>Настройки</button><div className="user"><span>W</span><div><strong>Wareon</strong><small>Owner</small></div><button>⋯</button></div></div></aside><main id="top"><header className="topbar"><button className="search"><span>⌕</span> Поиск каналов, публикаций и действий <kbd>⌘ K</kbd></button><div className="top-actions"><button className="icon-button">◌</button><button className="icon-button notification">◷<i/></button><span className="divider"/><span className="today">24 августа 2026</span></div></header><div className="main-content">{content}</div></main><style>{`.channel-hero{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.channel-hero h1{margin:0;color:#302d3c;font-size:24px;letter-spacing:-.7px}.channel-hero h1 span{display:inline-block;margin-left:8px;padding:4px 8px;border-radius:7px;background:#f1b829;color:#fff;font-size:10px;vertical-align:4px}.channel-hero p{margin:5px 0 0;color:#aaa6b3;font-size:12px}.portfolio-strip{display:grid;grid-template-columns:1.25fr repeat(3,1fr);gap:12px;margin-bottom:31px}.portfolio-card{min-height:124px;padding:16px;border:1px solid #eae7ef;border-radius:10px;background:#fff;display:grid;align-content:start;gap:6px;box-shadow:0 8px 20px rgba(44,34,80,.035)}.portfolio-card.all{border-color:#7b59e9}.portfolio-card .avatar{margin-bottom:4px}.portfolio-icon{color:#9476fb;font-size:29px;line-height:28px}.portfolio-card strong{color:#403c4a;font-size:12px}.portfolio-card small{color:#aaa6b3;font-size:10px}.portfolio-card button{margin-top:3px;border:1px solid #ddd9e5;border-radius:6px;padding:5px;background:white;color:#777285;font-size:10px}.analytics-layout{max-width:940px;margin:0 auto}.analytics-main{padding:0 20px}.analytics-title{display:flex;justify-content:space-between;align-items:center}.analytics-title h2{margin:0;color:#3d3947;font-size:16px}.analytics-title h2 span{color:#7653e4;font-size:13px;font-weight:600}.analytics-main .chart{height:278px;margin-top:12px}.income-card{max-width:690px;margin:24px auto;border:1px solid #ebe8f0;border-radius:13px;background:#fff;padding:14px 20px;box-shadow:0 9px 26px rgba(44,34,80,.045)}.income-row{display:grid;grid-template-columns:16px 1fr 12px auto;align-items:center;gap:9px;padding:10px 0;border-bottom:1px solid #f0eef4}.income-row:last-child{border:0}.income-check{display:grid;place-items:center;width:13px;height:13px;border-radius:3px;background:#7b58e8;color:white;font-size:9px}.income-row strong{color:#575362;font-size:12px}.income-row i{width:8px;height:8px;border-radius:50%}.income-row .violet{background:#7a58e8}.income-row .pink{background:#d55bdd}.income-row .cyan{background:#1aa8b7}.income-row .lavender{background:#c4b1ff}.income-row .rose{background:#b55185}.income-row b{color:#42404a;font-size:12px}.report-table{max-width:760px;margin:28px auto 0}.table-head,.table-line{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr 1.3fr;align-items:center;gap:10px}.table-head{margin-top:18px;padding:9px 0;border-bottom:1px solid #eae8ef;color:#9893a3;font-size:10px}.table-line{padding:13px 0;border-bottom:1px solid #f0eef4;color:#66616f;font-size:11px}.table-line:last-child{border:0}.table-line span:first-child{display:flex;align-items:center;gap:8px;color:#4e4a59}.table-line i{color:#7e5dea;font-style:normal;font-size:14px}.table-line b{color:#2c967c;font-size:9px;font-weight:700}@media(max-width:760px){.channel-hero{align-items:flex-start;gap:14px;flex-direction:column}.portfolio-strip{grid-template-columns:1fr 1fr}.analytics-main{padding:0}.income-card{padding:12px}.report-table{overflow:auto}.table-head,.table-line{min-width:620px}.analytics-main .chart{height:210px}}`}</style></div>;
}

export default App;
