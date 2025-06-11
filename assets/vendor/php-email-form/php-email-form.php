<?php
class PHP_Email_Form
{
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $ajax = false;
    private $messages = [];

    public function add_message($content, $label = '', $priority = 0)
    {
        if (!empty($content)) {
            $this->messages[] = ($label ? "<strong>$label:</strong> " : "") . htmlspecialchars($content);
        }
    }

    public function send()
    {
        if (!$this->to || !$this->from_email || !$this->subject || empty($this->messages)) {
            return 'Email tidak lengkap.';
        }

        $headers  = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
        $headers .= "Reply-To: " . $this->from_email . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        $message_body = implode("<br>\n", $this->messages);

        if (mail($this->to, $this->subject, $message_body, $headers)) {
            return $this->ajax ? 'OK' : 'Pesan berhasil dikirim.';
        } else {
            return 'Gagal mengirim email.';
        }
    }
}
