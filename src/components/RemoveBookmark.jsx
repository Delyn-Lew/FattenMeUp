function RemoveBookmark({ onRemove, RecordId }) {
  return (
    <>
      <button onClick={() => onRemove(RecordId)}>Remove from Bookmark</button>
    </>
  );
}
export default RemoveBookmark;
