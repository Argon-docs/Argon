"""Token sampling utilities"""

import torch


def apply_repetition_penalty(logits_cpu: torch.Tensor, recent_ids, penalty: float):
    """
    Apply repetition penalty to logits.
    
    Args:
        logits_cpu: Logits tensor on CPU
        recent_ids: List of recently generated token IDs
        penalty: Repetition penalty factor (>1.0 to penalize)
    """
    if penalty is None or penalty <= 1.0 or not recent_ids:
        return
    uniq = set(int(t) for t in recent_ids)
    for tid in uniq:
        val = logits_cpu[tid].item()
        if val > 0:
            logits_cpu[tid] = val / penalty
        else:
            logits_cpu[tid] = val * penalty


def sample_top_p(logits_cpu: torch.Tensor, temperature: float, top_p: float) -> int:
    """
    Sample token using top-p (nucleus) sampling.
    
    Args:
        logits_cpu: Logits tensor on CPU
        temperature: Sampling temperature
        top_p: Top-p (nucleus) threshold
        
    Returns:
        Sampled token ID
    """
    if temperature is None or temperature <= 0:
        temperature = 1.0
    scaled = logits_cpu / float(temperature)
    probs = torch.softmax(scaled, dim=-1)
    # Nucleus sampling
    sorted_probs, sorted_idx = torch.sort(probs, descending=True)
    cum = torch.cumsum(sorted_probs, dim=-1)
    mask = cum > float(top_p)
    # Always keep at least one
    if mask.numel() > 0:
        mask[0] = False
    filtered_probs = sorted_probs.masked_fill(mask, 0.0)
    filtered_probs = filtered_probs / filtered_probs.sum()
    choice = torch.multinomial(filtered_probs, num_samples=1).item()
    return int(sorted_idx[choice].item())

