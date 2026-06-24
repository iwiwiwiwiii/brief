import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    stage: 'idea',
    goal: 'поддержка',
    target_audience: '',
    team: '',
    contacts: '',
    links: '',
    figmalink: ''
  });

  const [errors, setErrors] = useState({});
  const [savedBrief, setSavedBrief] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUrlForBrief = async () => {
      const path = window.location.pathname;
      const match = path.match(/\/api\/briefs\/([a-zA-Z0-9-]+)/);
      
      if (match && match[1]) {
        const shortId = match[1];
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/briefs/${shortId}`);
          if (response.ok) {
            const data = await response.json();
            let parsedDesc = {};
            try {
              parsedDesc = JSON.parse(data.description);
            } catch (e) {
              parsedDesc = { description: data.description };
            }

            setSavedBrief({
              title: data.project_name,
              description: parsedDesc.description || '',
              problem: parsedDesc.problem || '',
              solution: parsedDesc.solution || '',
              stage: parsedDesc.stage || 'idea',
              goal: parsedDesc.goal || 'поддержка',
              target_audience: parsedDesc.target_audience || '',
              team: parsedDesc.team || '',
              contacts: data.contacts,
              links: parsedDesc.links || '',
              figmalink: data.figma_link || '',
              short_id: data.short_id
            });
          }
        } catch (error) {
          console.error('Ошибка загрузки брифа:', error);
        }
      }
      setIsLoading(false);
    };

    checkCurrentUrlForBrief();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'title', 'description', 'solution', 
      'target_audience', 'team', 'contacts'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'Заполните это поле';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const payload = {
          project_name: formData.title,
          figma_link: formData.figmalink || null,
          contacts: formData.contacts,
          description: JSON.stringify({
            description: formData.description,
            problem: formData.problem,
            solution: formData.solution,
            stage: formData.stage,
            goal: formData.goal,
            target_audience: formData.target_audience,
            team: formData.team,
            links: formData.links
          })
        };

        const response = await fetch('http://127.0.0.1:8000/api/briefs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || 'Ошибка сервера');
        }

        const data = await response.json();
        const newPath = `/api/briefs/${data.short_id}`;
        window.history.pushState({}, '', newPath);
        
        setSavedBrief({ 
          ...formData, 
          short_id: data.short_id, 
          edit_token: data.edit_token 
        });
        
      } catch (error) {
        console.error('Ошибка отправки:', error);
        alert(`Не удалось сохранить бриф. Ошибка: ${error.message}`);
      }
    } else {
      alert('Заполните все обязательные поля.');
    }
  };

  const handleReset = () => {
    window.history.pushState({}, '', '/');
    setSavedBrief(null);
    setFormData({
      title: '',
      description: '',
      problem: '',
      solution: '',
      stage: 'idea',
      goal: 'поддержка',
      target_audience: '',
      team: '',
      contacts: '',
      links: '',
      figmalink: ''
    });
  };

  if (isLoading) {
    return <div className="page-container"><div className="form-card">Загрузка паспорта проекта...</div></div>;
  }

  if (savedBrief) {
    return (
      <div className="page-container">
        <div className="form-card passport-card">
          <div className="passport-header">
            <span className="passport-badge">Паспорт проекта #{savedBrief.short_id}</span>
            <h1 className="form-title">{savedBrief.title}</h1>
            <p className="form-subtitle">АО «Технопарк Санкт‑Петербурга»</p>
          </div>

          <div className="passport-content">
            <div className="passport-section">
              <h3>О продукте</h3>
              <p>{savedBrief.description}</p>
            </div>

            <div className="passport-section">
              <h3>Какую проблему решаем</h3>
              <p>{savedBrief.problem}</p>
            </div>

            <div className="passport-section">
              <h3>Наше решение</h3>
              <p>{savedBrief.solution}</p>
            </div>

            <div className="passport-grid">
              <div className="passport-section">
                <h3>Стадия</h3>
                <span className="stage-tag">{savedBrief.stage.toUpperCase()}</span>
              </div>
              <div className="passport-section">
                <h3>Цель обращения</h3>
                <p>{savedBrief.goal}</p>
              </div>
            </div>

            <div className="passport-section">
              <h3>Для кого</h3>
              <p>{savedBrief.target_audience}</p>
            </div>

            <div className="passport-section">
              <h3>Команда</h3>
              <p>{savedBrief.team}</p>
            </div>

            <div className="passport-section">
              <h3>Контакты</h3>
              <p><strong>{savedBrief.contacts}</strong></p>
            </div>

            {savedBrief.figmalink && (
              <div className="passport-section">
                <h3>Прототип</h3>
                <a href={savedBrief.figmalink} target="_blank" rel="noreferrer" className="figma-link-anchor">{savedBrief.figmalink}</a>
              </div>
            )}

            {savedBrief.links && (
              <div className="passport-section">
                <h3>Ссылки</h3>
                <a href={savedBrief.links} target="_blank" rel="noreferrer">{savedBrief.links}</a>
              </div>
            )}

            <div className="passport-section next-step-box" style={{ marginTop: '25px', background: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #0056b3' }}>
              <h3>Следующий шаг</h3>
              <p>Рекомендуем материалы и меры поддержки на Инновационном портале Санкт-Петербурга:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {savedBrief.goal === 'поддержка' && <li><a href="https://spbtech.ru/mery-podderzhki" target="_blank" rel="noreferrer">Меры поддержки стартапов</a></li>}
                {savedBrief.goal === 'инвестиции' && <li><a href="https://spbtech.ru/ekosistema/navigator-po-investiciyam" target="_blank" rel="noreferrer">Навигатор по инвестициям</a></li>}
                {savedBrief.goal === 'резидентура' && <li><a href="https://spbtech.ru/tekhnopark-sankt-peterburga/biznes-inkubator/rezidentura" target="_blank" rel="noreferrer">Бизнес-инкубатор (Резидентура)</a></li>}
                {savedBrief.goal !== 'поддержка' && <li><a href="https://spbtech.ru/mery-podderzhki" target="_blank" rel="noreferrer">Меры поддержки</a></li>}
                <li><a href="https://spbtech.ru/ekosistema/infrastruktura-i-tekhnologicheskie-uslugi" target="_blank" rel="noreferrer">Инфраструктура и технологические услуги</a></li>
              </ul>
            </div>
          </div>

          {savedBrief.edit_token && (
            <div className="token-alert">
              <p><strong>Важно:</strong> Сохраните этот код для изменений: <code>{savedBrief.edit_token}</code></p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            <button onClick={() => window.print()} className="submit-btn" style={{ background: '#28a745' }}>
              Скачать / Печать PDF
            </button>
            <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="submit-btn" style={{ background: '#17a2b8' }}>
              Скопировать ссылку
            </button>
            <button onClick={handleReset} className="submit-btn secondary-btn">
              Создать новый бриф
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="form-title">Новый паспорт проекта</h1>
        <p className="form-subtitle">АО «Технопарк Санкт‑Петербурга»</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Название проекта *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Как называется ваш проект?" className="form-input" />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">О проекте *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Опишите ваш проект" maxLength={300} className="form-textarea" />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Какая проблема у ваших клиентов ?</label>
            <textarea name="problem" value={formData.problem} onChange={handleChange} placeholder="Опишите проблему " className="form-textarea" />
          </div>

          <div className="form-group">
            <label className="form-label">Наше решение *</label>
            <textarea name="solution" value={formData.solution} onChange={handleChange} placeholder="Какое решение этой проблемы?" className="form-textarea" />
            {errors.solution && <span className="error-text">{errors.solution}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Стадия проекта</label>
            <select name="stage" value={formData.stage} onChange={handleChange} className="form-select">
              <option value="idea">Идея</option>
              <option value="prototype">Прототип</option>
              <option value="mvp">Первая рабочая версия (MVP)</option>
              <option value="sales">Продажи</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Цель обращения</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="form-select">
              <option value="поддержка">Поддержка (Меры поддержки)</option>
              <option value="инвестиции">Инвестиции (Навигатор)</option>
              <option value="резидентура">Резидентура (Бизнес-инкубатор)</option>
              <option value="инфраструктура">Инфраструктура и тех. услуги</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Для кого этот продукт (Аудитория) *</label>
            <input type="text" name="target_audience" value={formData.target_audience} onChange={handleChange} placeholder="Кто этим пользуется?" className="form-input" />
            {errors.target_audience && <span className="error-text">{errors.target_audience}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Команда *</label>
            <textarea name="team" value={formData.team} onChange={handleChange} placeholder="Кто делает проект, какие роли" className="form-textarea" />
            {errors.team && <span className="error-text">{errors.team}</span>}
          </div>

          <div className="form-group">
            <label className="label">Контакты для связи *</label>
            <input type="text" name="contacts" value={formData.contacts} onChange={handleChange} placeholder="Телефон или Email" className="form-input" />
            {errors.contacts && <span className="error-text">{errors.contacts}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Ссылка на макет (Figma)</label>
            <input type="text" name="figmalink" value={formData.figmalink} onChange={handleChange} placeholder="Ссылка на фигму" className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Дополнительные ссылки</label>
            <input type="text" name="links" value={formData.links} onChange={handleChange} placeholder="Сайт, презентация или соцсети" className="form-input" />
          </div>

          <button type="submit" className="submit-btn">
            Сохранить паспорт
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;