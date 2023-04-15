
function ModalSettings() {
    return (
        <div>
            <input type="checkbox" id="my-modal-settings" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-settings" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Settings</h3>
                    <p className="py-4">This feature is under development! 💻🔃</p>
                </div>
            </div>
        </div>
    )
}

export default ModalSettings