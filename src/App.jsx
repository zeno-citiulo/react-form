import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [articles, setArticles] = useState([]);

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingTitle, setEditingTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    setArticles([...articles, title]);
    setTitle('');
  };

  const handleDelete = (index) => {
    const newArticles = articles.filter((_, i) => i !== index);
    setArticles(newArticles);
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingTitle(articles[index]);
  };

  const handleSave = (index) => {
    const newArticles = [...articles];
    newArticles[index] = editingTitle;
    setArticles(newArticles);

    setEditingIndex(-1);
    setEditingTitle('');
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setEditingTitle('');
  };

  return (
    <div className="container">
      <h1>Articoli di Blog</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Inserisci titolo articolo"
        />
        <button type="submit">Aggiungi</button>
      </form>

      <ul className="article-list">
        {articles.map((articleTitle, index) => {
          if (editingIndex === index) {
            return (
              <li key={index} className="article-item">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <div>
                  <button onClick={() => handleSave(index)}>Salva</button>
                  <button onClick={handleCancel}>Annulla</button>
                </div>
              </li>
            );
          } else {
            return (
              <li key={index} className="article-item">
                <span>{articleTitle}</span>
                <div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    &#x1f5d1;
                  </button>
                  <button onClick={() => handleEdit(index)}>Modifica</button>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default App;