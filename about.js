/* =============================================
   ABOUT PAGE JS — Chatpata Chat
   Contact Form -> WhatsApp
   ============================================= */

(function () {
  'use strict';

  var WA_NUMBER = '919876543210';
  var WA_BASE = 'https://wa.me/' + WA_NUMBER + '?text=';

  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = (document.getElementById('contactName') || {}).value || '';
    var phone = (document.getElementById('contactPhone') || {}).value || '';
    var email = (document.getElementById('contactEmail') || {}).value || '';
    var message = (document.getElementById('contactMessage') || {}).value || '';

    if (!name.trim() || !phone.trim() || !message.trim()) {
      showAlert('Please fill in Name, Phone and Message.', 'error');
      return;
    }

    var msg = 'Hello Chatpata Chat!

' +
      'Name: ' + name + '
' +
      'Phone: ' + phone + '
' +
      (email ? 'Email: ' + email + '
' : '') +
      '
Message:
' + message;

    window.open(WA_BASE + encodeURIComponent(msg), '_blank', 'noopener');
    showAlert('Redirecting to WhatsApp...', 'success');
    form.reset();
  });

  function showAlert(text, type) {
    var existing = document.getElementById('formAlert');
    if (existing) existing.remove();

    var alert = document.createElement('div');
    alert.id = 'formAlert';
    alert.textContent = text;
    alert.style.cssText =
      'padding:0.875rem 1.25rem;border-radius:10px;font-size:0.9rem;font-weight:600;' +
      'margin-top:1rem;text-align:center;transition:all 0.3s ease;' +
      (type === 'success'
        ? 'background:rgba(45,157,95,0.12);color:#1E7A47;border:1px solid rgba(45,157,95,0.25);'
        : 'background:rgba(214,40,40,0.1);color:#D62828;border:1px solid rgba(214,40,40,0.2);');
    form.appendChild(alert);

    setTimeout(function () { alert.remove(); }, 4000);
  }
})();
