<link href="dist/styles/bundle.css" rel="stylesheet" />

<div class="shft-footer">
  <div class="shft-container">
    <div class="shft-footer-grid">
      <div class="shft-footer-first-cell">
        <div class="shft-footer__first">
          <a href="/" class="shft-footer__logo"><img src="/images/logo.png" alt="" /></a>
          <div class="shft-footer__behalf"><?php echo $site['shortdesc']; ?></div>
          <div class="shft-footer__sitename"><?php echo $site['shortname']; ?></div>
          <div class="shft-footer__copyright"><?php echo $site['copyright']; ?></div>
        </div>

        <a
          href="http://domenart-studio.ru/"
          target="_blank"
          class="shft-footer__creator">
          Разработка сайта<br />
          веб-студия “ДоменАрт”
        </a>
      </div>
      <div class="shft-footer-second-cell">
        <ul class="shft-footer__menu">
          <?php foreach ($site['links'] as $link): ?>
            <li><a href="<?php echo $link['href']; ?>"><?php echo $link['title']; ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div class="shft-footer-third-cell">
        <div class="shft-footer__contacts">
          Мы в социальных сетях
          <div class="shft-footer-socials">
            <?php foreach ($site['social'] as $link): ?>
              <a href="<?php echo $link['href']; ?>" target="_blank">
                <?php echo $link['icon']; ?>
              </a>
            <?php endforeach; ?>
          </div>
          <span>Контакты и поддержка</span>
          <a href="mailto:support@avernus.ru">support@avernus.ru</a>
        </div>

        <div class="shft-footer__buttons">
          <button data-shft-modal-toggle="#shft-modal-question">
            Задать вопрос
          </button>
          <a href="/login">Вход</a>
        </div>

        <div class="shft-footer__counters"></div>
      </div>
    </div>
  </div>
</div>

<div class="shft-modal" id="shft-modal-question">
  <button class="shft-modal__close" data-shft-modal-close></button>
  <div class="shft-modal__title">
    Есть вопросы?<br />
    Напишите нам
  </div>
  <div class="shft-modal__body">
    <form
      action="/email/question"
      method="post"
      class="shft-form"
      id="shft-question-form">
      <input type="hidden" name="action" value="question-form" />
      <div class="shft-form__row">
        <input
          type="email"
          name="email"
          placeholder="E-mail*"
          class="shft-input"
          required="" />
      </div>
      <div class="shft-form__row">
        <input type="text" name="name" placeholder="Имя" class="shft-input" />
      </div>
      <div class="shft-form__row">
        <textarea
          name="message"
          placeholder="Напишите Ваш вопрос"
          class="shft-textarea"
          rows="6"></textarea>
      </div>
      <div class="shft-form__row">
        <input
          type="text"
          name="whatsapp"
          placeholder="Ваш Whatsapp (по желанию)"
          class="shft-input" />
      </div>
      <div class="shft-form__row">
        <label class="shft-form__approve">
          <input
            type="checkbox"
            name="approve"
            value="1"
            checked=""
            required="" />
          <span>
            Прочитал(-а) и соглашаюсь с
            <a href="/policy" target="_blank">политикой конфиденциальности</a>
          </span>
        </label>
      </div>
      <div class="shft-form__row">
        <button class="shft-form__submit shft-submit" type="submit">
          Отправить
        </button>
      </div>
    </form>
  </div>
</div>

<script src="dist/scripts/bundle.js"></script>