from locust import HttpUser, task, between


class PolyScaleUser(HttpUser):
    wait_time = between(0.5, 2)

    @task(3)
    def payment_flow(self):
        self.client.get('/api/promotions')
        self.client.get('/api/applications')

    @task(2)
    def crm_flow(self):
        self.client.get('/api/blueprints')

    @task(1)
    def mobile_flow(self):
        self.client.get('/api/applications/1/metrics')
