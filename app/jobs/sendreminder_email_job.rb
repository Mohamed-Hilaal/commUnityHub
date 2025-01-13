class SendreminderEmailJob < ApplicationJob
  queue_as :default

  def perform
    p 'Hey performing a job'
  end
end
