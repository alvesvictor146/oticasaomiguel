document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('couponInput');
  const btn = document.getElementById('applyCouponBtn');
  const feedback = document.getElementById('couponFeedback');
  const successArea = document.getElementById('successArea');
  const discountValue = document.getElementById('discountValue');
  const whatsappBtn = document.getElementById('whatsappBtn');

  // Simulated valid coupons database
  const VALID_COUPONS = {
    'MIGUEL10': { discount: '10%', description: 'Desconto em todas as armações' },
    'PRIMEIRACOMPRA': { discount: '15%', description: 'Desconto no primeiro pedido' },
    'LENTEGRATIS': { discount: 'Lente Incolor', description: 'Na compra de armações selecionadas' }
  };

  let appliedCoupon = null;

  function getUsedCoupons() {
    try {
      const stored = localStorage.getItem('oticas_used_coupons');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function markCouponAsUsed(code) {
    try {
      const usedCoupons = getUsedCoupons();
      if (!usedCoupons.includes(code)) {
        usedCoupons.push(code);
        localStorage.setItem('oticas_used_coupons', JSON.stringify(usedCoupons));
      }
    } catch (e) {
      console.error('Erro ao salvar cupom', e);
    }
  }

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `coupon-feedback visible ${type}`;
    
    // Shake effect on error
    if (type === 'error') {
      input.parentElement.style.transform = 'translateX(-10px)';
      setTimeout(() => input.parentElement.style.transform = 'translateX(10px)', 50);
      setTimeout(() => input.parentElement.style.transform = 'translateX(-10px)', 100);
      setTimeout(() => input.parentElement.style.transform = 'translateX(0)', 150);
    }
  }

  function applyCoupon() {
    const code = input.value.trim().toUpperCase();

    if (!code) {
      showFeedback('Por favor, digite um código de cupom.', 'error');
      return;
    }

    if (!VALID_COUPONS[code]) {
      showFeedback('Cupom inválido ou expirado.', 'error');
      return;
    }

    const usedCoupons = getUsedCoupons();
    if (usedCoupons.includes(code)) {
      showFeedback('Você já utilizou este cupom neste dispositivo.', 'warning');
      return;
    }

    // Success
    const info = VALID_COUPONS[code];
    appliedCoupon = code;
    markCouponAsUsed(code);
    
    showFeedback(`Cupom aplicado com sucesso! ${info.description}.`, 'success');
    
    // Reveal success area
    discountValue.textContent = info.discount;
    successArea.classList.remove('hidden');
    
    // Animation for reveal
    successArea.style.opacity = 0;
    successArea.style.transform = 'translateY(20px)';
    setTimeout(() => {
      successArea.style.transition = 'all 0.5s ease';
      successArea.style.opacity = 1;
      successArea.style.transform = 'translateY(0)';
    }, 50);
  }

  btn.addEventListener('click', applyCoupon);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applyCoupon();
  });

  whatsappBtn.addEventListener('click', () => {
    const phone = '5512997829787';
    let message = 'Olá! Acessei o novo site e gostaria de fazer uma avaliação/pedido.';
    
    if (appliedCoupon) {
      const discount = VALID_COUPONS[appliedCoupon].discount;
      message += ` 🎟️ Tenho o cupom validado: ${appliedCoupon} (${discount})`;
    }
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  });
});
