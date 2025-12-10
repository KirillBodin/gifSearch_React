export async function downloadGif(url: string, filename: string): Promise<void> {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Failed to download GIF");
    }
  
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "gif";
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    URL.revokeObjectURL(blobUrl);
  }
  
  export async function copyGifLink(url: string): Promise<void> {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }
  