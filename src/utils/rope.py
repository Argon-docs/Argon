"""Rotary Position Embedding (RoPE) implementation"""

import torch


def apply_rope(hd_mat: torch.Tensor, pos: int, d_rot: int, base: float, device: torch.device) -> torch.Tensor:
    """
    Apply rotary positional embedding to Q/K tensors.
    
    Args:
        hd_mat: Head dimension matrix [num_heads, head_dim]
        pos: Position index
        d_rot: Rotary dimension
        base: Base frequency for RoPE
        device: CUDA device
        
    Returns:
        Tensor with RoPE applied
    """
    d = int(d_rot)
    if d <= 0:
        return hd_mat
    rot = hd_mat[:, :d]
    half = d // 2
    idx = torch.arange(half, device=device, dtype=torch.float32)
    inv = (base ** (-idx / float(half))).view(1, -1)
    angle = pos * inv
    cos = torch.cos(angle)
    sin = torch.sin(angle)
    x1 = rot[:, :half].float()
    x2 = rot[:, half:d].float()
    r_first = x1 * cos - x2 * sin
    r_second = x2 * cos + x1 * sin
    rot[:, :half] = r_first.to(rot.dtype)
    rot[:, half:d] = r_second.to(rot.dtype)
    hd_mat[:, :d] = rot
    return hd_mat

