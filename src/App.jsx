import React, { useState } from "react";
import "./App.css";

import NewArticleForm from "./components/NewArticleForm";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);

  const [editingIndex, setEditingIndex] = useState(-1);

  const [editingFormData, setEditingFormData] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
    tags: {
      Tags: false,
      Vue: false,
      Angular: false,
      Svelte: false,
    },
    published: false,
  });

  const handleAddArticle = (newArticle) => {
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };


  const handleDelete = (index) => {
    const newArticles = articles.filter((_, i) => i !== index);
    setArticles(newArticles);
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingFormData(articles[index]);
  };


  const handleSave = (index) => {
    const newArticles = [...articles];
    newArticles[index] = editingFormData;
    setArticles(newArticles);
    setEditingIndex(-1);
  };


  const handleCancel = () => {
    setEditingIndex(-1);
    setEditingFormData({
      title: "",
      image: "",
      content: "",
      category: "",
      tags: {
        React: false,
        Vue: false,
        Angular: false,
        Svelte: false,
      },
      published: false,
    });
  };

  return (
    <div className="container">
      <h1>Articoli di Blog</h1>

      <NewArticleForm onAddArticle={handleAddArticle} />

      <ArticleList
        articles={articles}
        editingIndex={editingIndex}
        editingFormData={editingFormData}
        setEditingFormData={setEditingFormData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;