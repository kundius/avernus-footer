/**
 * Обработчик отправки формы обратной связи через AJAX.
 *
 * Логика:
 * 1. Перехватывает стандартную отправку формы.
 * 2. Блокирует кнопку submission на время запроса для предотвращения дублей.
 * 3. Отправляет данные методом POST с заголовками для ожидания JSON-ответа.
 * 4. Обрабатывает унифицированный ответ сервера:
 *    - Успех: очищает форму, показывает уведомление.
 *    - Ошибка: выводит общее сообщение и список ошибок валидации по полям.
 *
 * Требования к бэкенду:
 * - Эндпоинт должен принимать POST-запросы.
 * - Ответ всегда должен быть в формате JSON со структурой:
 *   { success: boolean, message: string, errors?: object }
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shft-question-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".shft-submit");
    const originalBtnText = submitBtn.textContent;
    const formData = new FormData(form);

    // Сброс предыдущих состояний и сообщений
    setLoading(submitBtn, true);
    clearMessages(form);

    try {
      const response = await fetch(form.getAttribute("action"), {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest", // Стандартный заголовок для AJAX-запросов
        },
      });

      // Парсим тело ответа независимо от HTTP-статуса,
      // так как бизнес-логика успеха/ошибки находится внутри JSON
      const data = await response.json();

      if (data.success) {
        showSuccess(form, data.message);
        form.reset();
      } else {
        // Агрегация ошибок: общее сообщение + детали по полям
        let errorList = "";

        if (data.message) {
          errorList += data.message;
        }

        if (data.errors && typeof data.errors === "object") {
          // Преобразуем объект ошибок в плоский массив сообщений
          const fieldErrors = Object.values(data.errors).flat();
          if (fieldErrors.length > 0) {
            errorList += (errorList ? "<br>" : "") + fieldErrors.join("<br>");
          }
        }

        showError(form, errorList || "Произошла ошибка при обработке данных.");
      }
    } catch (error) {
      console.error("Network error:", error);
      showError(
        form,
        "Нет соединения с сервером. Пожалуйста, попробуйте позже.",
      );
    } finally {
      // Возвращаем кнопку в исходное состояние в любом случае
      setLoading(submitBtn, false, originalBtnText);
    }
  });
});

// --- Вспомогательные функции ---

/**
 * Переключает состояние кнопки (активна/загружается)
 */
function setLoading(button, isLoading, originalText = "") {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = originalText || button.textContent;
    button.textContent = "Отправка...";
    button.style.opacity = "0.7";
    button.style.cursor = "not-allowed";
  } else {
    button.disabled = false;
    button.textContent =
      originalText || button.dataset.originalText || "Отправить";
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  }
}

/**
 * Удаляет существующие уведомления из формы
 */
function clearMessages(form) {
  const existingMsg = form.querySelector(".form-message");
  if (existingMsg) existingMsg.remove();
}

/**
 * Рендерит уведомление об успехе или ошибке
 * @param {HTMLElement} form - Элемент формы
 * @param {string} type - 'success' или 'error'
 * @param {string} htmlContent - Текст сообщения (поддерживает HTML)
 */
function showMessage(form, type, htmlContent) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `form-message form-message--${type}`;
  msgDiv.innerHTML = htmlContent;

  // Инлайн-стили для быстрой интеграции (рекомендуется вынести в CSS)
  msgDiv.style.padding = "12px";
  msgDiv.style.marginBottom = "20px";
  msgDiv.style.borderRadius = "4px";
  msgDiv.style.fontSize = "14px";
  msgDiv.style.lineHeight = "1.4";
  msgDiv.style.border = "1px solid transparent";

  if (type === "success") {
    msgDiv.style.backgroundColor = "#d4edda";
    msgDiv.style.color = "#155724";
    msgDiv.style.borderColor = "#c3e6cb";
  } else {
    msgDiv.style.backgroundColor = "#f8d7da";
    msgDiv.style.color = "#721c24";
    msgDiv.style.borderColor = "#f5c6cb";
  }

  form.prepend(msgDiv);

  // Автоматическое скрытие успешного сообщения
  if (type === "success") {
    setTimeout(() => {
      msgDiv.style.transition = "opacity 0.5s";
      msgDiv.style.opacity = "0";
      setTimeout(() => msgDiv.remove(), 500);
    }, 5000);
  }
}

function showSuccess(form, text) {
  showMessage(form, "success", text);
}

function showError(form, text) {
  showMessage(form, "error", text);
}
