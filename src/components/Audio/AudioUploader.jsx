export default function AudioUploader({
  onFileSelect,
  file,
}) {
  return (
    <div className="upload-container">
      <label className="upload-btn">
        🎵 Upload Track

        <input
          type="file"
          accept="audio/*"
          hidden
          onChange={(e) =>
            onFileSelect(e.target.files[0])
          }
        />
      </label>

      {file && (
        <div className="now-playing">
          🎶 {file.name}
        </div>
      )}
    </div>
  );
}