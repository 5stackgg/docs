# Why Kubernetes?

5Stack is built with Kubernetes in mind. It removes much of the infrastructure complexity normally required to operate a highly distributed system, while providing critical features needed to deliver smooth, reliable competitive gaming experiences.

## Key Benefits

- **Distributed Game Server Nodes**  
  Connect multiple physical game server machines as Kubernetes nodes. Tailscale is used to securely network hosts together.

- **Reliability & Safety**  
  Built-in health checks, zero-downtime deployments, comprehensive logging, resource allocation, and CPU pinning for optimal performance.

- **Priority & Preemption**  
  Ensure live matches are never starved by background jobs or maintenance tasks.

- **Metrics & Monitoring**  
  Collect CPU, memory, network, and disk metrics across all game servers and infrastructure components.

- **Rapid Server Provisioning**  
  Provision new game servers in seconds instead of minutes, enabling on-demand match creation.

- **Self-Healing**  
  Automatic restarts and rescheduling keep game servers online when processes or hosts fail.

- **Configuration Management**  
  Manage configuration, API keys, and sensitive data securely using ConfigMaps and Secrets.

- **Persistent Storage**  
  Use persistent volumes for demo storage and game file management across restarts.

- **Resource Management**  
  Resource limits and quotas prevent exhaustion and ensure fair allocation across all game servers.

- **Rolling Updates**  
  Update game server versions or configurations with zero downtime using controlled rollout strategies.

- **Network Security**  
  Network policies provide fine-grained control over traffic between pods and services.

---

## Why Not Docker Compose?

Docker Compose is excellent for local development and small, static deployments, but it breaks down quickly under the scale and reliability requirements of competitive game servers.

### 1. Single-Host Limitation

Docker Compose is fundamentally designed for a single machine.

- No native multi-node scheduling
- No awareness of other hosts
- No cross-host service discovery

### 2. No Real Scheduler

Docker Compose does not decide _where_ workloads should run.

- No CPU topology awareness
- No resource-based placement
- No priority or preemption
- No affinity or anti-affinity rules

### 3. Poor Failure Handling

Failure recovery in Docker Compose is limited.

- No health-based rescheduling
- No host-level failover
- No self-healing beyond basic restarts

### 4. No Safe Rolling Updates

Docker Compose cannot perform true zero-downtime updates.

- Updates require stopping containers
- No controlled rollout strategy
- No automated rollback

### 5. Limited Observability

Docker Compose has no built-in observability stack.

- Logs are local to the host
- No unified metrics
- No event stream

### 6. Weak Configuration & Secrets Handling

Docker Compose secrets are static and host-bound.

- No secret rotation
- No RBAC controls
- Secrets tied to file paths

### 7. No Multi-Tenancy or Isolation

Docker Compose has no real isolation model.

- No namespaces
- No quotas
- No enforced resource boundaries

---

## When Docker Compose _Is_ the Right Tool

Docker Compose works well for:

- Local development
- Single-host deployments
- Small communities
- Prototyping

**5Stack goes beyond this scope:**

- Multi-node
- Multi-region
- High uptime requirements
- Competitive integrity guarantees
