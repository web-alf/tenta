jQuery(document).ready(function ($) {
  // preloader

  // Book a Call popup modal (replaces scroll-to-#book-call, which broke
  // when late-loading images shifted the page layout mid-scroll).
  //
  // Two separate modal instances are expected in the markup:
  // - #book-call-modal        : the 2-card chooser
  // - #book-call-modal-direct : the old single-embed calendar
  var $bookCallModal = $('#book-call-modal');
  var $bookCallDirectModal = $('#book-call-modal-direct');

  function showBookCallChoices($widget) {
    $widget.find('[data-book-call-view="panel"]').attr('hidden', true);
    $widget.find('[data-book-call-view="choices"]').attr('hidden', false);
  }

  function showBookCallPanel($widget, target) {
    $widget.find('[data-book-call-view="choices"]').attr('hidden', true);
    $widget.find('[data-book-call-view="panel"]').attr('hidden', true);
    $widget.find('[data-book-call-panel="' + target + '"]').attr('hidden', false);
  }

  function openModal($modal) {
    $modal.addClass('is-open').attr('aria-hidden', 'false');
    $('body').addClass('book-call-modal-open');
  }

  function closeModal($modal) {
    $modal.removeClass('is-open').attr('aria-hidden', 'true');
    $('body').removeClass('book-call-modal-open');
  }

  function openBookCallModal(e) {
    if (e) e.preventDefault();
    showBookCallChoices($bookCallModal.find('.book-call-widget'));
    openModal($bookCallModal);
  }

  function openBookCallDirectModal(e) {
    if (e) e.preventDefault();
    openModal($bookCallDirectModal);
  }

  function closeBookCallModal() {
    closeModal($bookCallModal);
    closeModal($bookCallDirectModal);
    showBookCallChoices($bookCallModal.find('.book-call-widget'));
  }

  window.openBookCallModal = openBookCallModal;
  window.openBookCallDirectModal = openBookCallDirectModal;
  window.closeBookCallModal = closeBookCallModal;

  $(document).on('click', 'a[href="#price-quote"], a[href$="#price-quote"], .book-call-btn a, .js-book-call-trigger, .js-book-call-chooser-trigger', function (e) {
    var isChooser = $(this).hasClass('js-book-call-chooser-trigger')
      || $(this).closest('.book-call-btn').length > 0
      || !!window.isBookCallChooserDefault;
    if (isChooser) {
      openBookCallModal(e);
    } else {
      openBookCallDirectModal(e);
    }
  });
  $(document).on('click', '[data-book-call-close]', closeBookCallModal);
  $(document).on('click', '[data-book-call-target]', function () {
    showBookCallPanel($(this).closest('.book-call-widget'), $(this).data('book-call-target'));
  });
  $(document).on('click', '[data-book-call-back]', function () {
    showBookCallChoices($(this).closest('.book-call-widget'));
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeBookCallModal();
  });

});
