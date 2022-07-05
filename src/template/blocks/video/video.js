class Video {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    this.isPlay = false;
    this.classPlay = 'video_play';
    this.iframe = this.element.querySelector('iframe');

    this.element.addEventListener('click', () => {
      this.isPlay = !this.isPlay;
      this.element.classList.toggle(this.classPlay);

      if (this.isPlay) {
        this.iframe.src = this.iframe.src + '?autoplay=1';
      } else {
        this.iframe.src = this.iframe.src;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video');
  if (videos.length > 0) {
    videos.forEach((video) => {
      new Video(video);
    });
  }
});