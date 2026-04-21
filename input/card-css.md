/* ── Font ── */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

/* ── Section ── */
.achievements {
  margin-bottom: 96px;
}

.achievements__inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ── Title ── */
.achievements__title-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 40px;
}

.achievements__title {
  font-size: 40px;
  font-weight: 600;
  font-family: 'Montserrat Variable', 'Helvetica Neue', sans-serif;
  margin: 0;
  color: #1d1d1d;
}

.text-accent {
  color: #e935a1; /* Hot pink accent */
}

.achievements__note {
  font-size: 16px;
  font-weight: 500;
  font-family: 'Montserrat Variable', 'Helvetica Neue', sans-serif;
  color: #1d1d1d;
  margin: 0;
}

/* ── Grid of cards ── */
.achievements__items-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 352px);
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ── Individual card ── */
.achievements__item {
  background-color: #f5f5f5;
  background-repeat: no-repeat;
  background-position: 100% 100%;  /* bottom-right corner */
  background-size: 450px;          /* larger than card = overflow crop effect */
  border-radius: 30px;
  padding: 32px;
  width: 352px;
  height: 485px;
  box-sizing: border-box;
}

/* ── Each card's unique background image (3D object + gradient glow) ── */
.achievements__item--junk {
  background-image: url('junk.jpg');      /* green 3D yin-yang + green glow */
}
.achievements__item--threats {
  background-image: url('threats.jpg');   /* pink 3D stop-hand + pink glow */
}
.achievements__item--speed {
  background-image: url('speed.jpg');     /* orange 3D lightning + orange glow */
}

/* ── Label row (icon + category text) ── */
.achievements__text-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.achievements__icon {
  width: 24px;
  height: 24px;
  display: block;
}

.achievements__name {
  font-size: 16px;
  font-weight: 500;
  font-family: 'Montserrat Variable', 'Helvetica Neue', sans-serif;
  color: #78797a;    /* muted gray */
  margin: 0;
  line-height: 28px;
}

/* ── Big stat number ── */
.achievements__info {
  font-size: 60px;
  font-weight: 500;
  font-family: 'Montserrat Variable', 'Helvetica Neue', sans-serif;
  color: #1d1d1d;
  line-height: 60px;
  letter-spacing: -1px;
  margin: 0 0 24px 0;
}