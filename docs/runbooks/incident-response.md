# Runbook d'incident PolyScale

## 1. Déploiement ArgoCD en échec

1. Vérifier l'état des pods ArgoCD dans le namespace `argocd`.
2. Contrôler l'état de la connexion GitHub et la validité du repo cible.
3. Vérifier les permissions RBAC associées au service account ArgoCD.
4. Recharger ou resynchroniser l'application depuis l'interface ArgoCD.
5. Vérifier les logs de l'agent de synchronisation et la présence de chart Helm valides.

## 2. Cluster client inaccessible

1. Vérifier la validité du kubeconfig ou du token JWT d'accès.
2. Contrôler la connectivité réseau entre le backend et le cluster.
3. Vérifier les permissions Kubernetes pour namespace, deployment et service.
4. Revalider le secret de cluster stocké chiffré dans SQLite.

## 3. Latence ou erreur élevée

1. Vérifier les métriques Prometheus / Grafana.
2. Inspecter la charge Locust sur les endpoints critiques.
3. Vérifier les quotas CPU / RAM et les règles de rate limiting.
4. Vérifier l'état des pods et des services backend / frontend.
